const currencyModel = require('../models/currencies').currencyModel
const currencyUpdateTimeModel = require('../models/currenciesUpdateTime').currencyUpdateTimeModel
const axios = require('axios')
const authController = require("./authController");


//functions used in DB modelling
function convertDate(date){
    const separatedDate = date.split('-')
    for (let i = 1; i < 3; i++) {
        if(separatedDate[i].length === 1){
            separatedDate[i] = '0' + separatedDate[i];
        }
    }
    return separatedDate.join('-');
}
//functions updating automatically our database
function getThreeMonthLaterDate(){
    const currentDate = new Date();
    const pastDate = new Date(currentDate.setMonth(currentDate.getMonth() - 3));
    const date = String(pastDate.getFullYear() + '-' + (pastDate.getMonth()+1) + '-' + pastDate.getDate());
    return convertDate(date);
}

function getActualDate(){
    const today = new Date();
    const date = String(today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate());
    return convertDate(date);
}

async function fetchPastCurrenciesTables(){
    let pastDate = getThreeMonthLaterDate();
    let currentDate = getActualDate();
    let nbpURL = 'http://api.nbp.pl/api/exchangerates/tables/A/pastDate/currentDate/';
    nbpURL = nbpURL.replace('pastDate', String(pastDate));
    nbpURL = nbpURL.replace('currentDate', String(currentDate));
    await axios.get(nbpURL, {
        headers: {
            Accept: 'application/json'
        }
    }).then( async res => {
        //Check if is in DB to avoid duplicating
        for (const el of res.data) {
            const answer = await currencyUpdateTimeModel.find({effectiveDate: el.effectiveDate});
            if(answer[0] !== undefined){
                continue;
            }
            else {
                const newCurrencyUpdateTime = new currencyUpdateTimeModel({effectiveDate: el.effectiveDate})
                await newCurrencyUpdateTime.save().then( async () => {
                         await dispatchCurrenciesTable(el, el.effectiveDate)
                })
            }
        }
    }).catch( error => {
        console.log("Cannot fetch many tables ", error);
    })
}

//manually fetch data from 3 months to the DB

// fetchPastCurrenciesTables()

async function checkIfUpdateFromRemoteAvailable(){
    await currencyUpdateTimeModel.find().sort({effectiveDate: -1})
        .then(async res => {
            if(res[0] === undefined){
                await updateCurrencies()
            }
            else{
                const date = getActualDate()
                //uwaga konieczne sprawdzenie w funckji update czy ostatni waluty maja date inna niż te ktore pobieramy zeby nie pobierac 2 razy tego samego
                if(res[0].effectiveDate !== date){
                    await updateCurrencies();
                }
            }
        })
        .catch(error => {
            console.log("At checkIfUpdateFromRemoteAvailable ", error);
        })
}


/**
 * http://api.nbp.pl/api/exchangerates/tables/A udostępnia dane o śrendich kursach walut,
 * gdzie tabela A zawiera 34 najpopularniejszych walut
 * Tabela A kursów średnich walut obcych aktualizowana jest w każdy dzień roboczy, między godziną 11:45 a 12:15.
 * Pobiera 34 waluty wiec ilosc wpisow w bazie danych w kolekcji currencies powinna byc wielokrotnoscia dni * 34
 */
async function updateCurrencies(){
    await axios.get('http://api.nbp.pl/api/exchangerates/tables/A', {
        headers : {
            Accept: "application/json"
        }
    }).then(async res => {
        let effectiveDate;
        let lastEffectiveDate;
        //check if last currencies have other date than fetched
        await currencyUpdateTimeModel.find().sort({effectiveDate: -1})
            .then(async res => {
                if(res[0] === undefined){
                    lastEffectiveDate = "1970-01-01"
                }
                else {
                    lastEffectiveDate = res[0].effectiveDate;
                }
            })
        for (const item of res.data) {
            effectiveDate = item.effectiveDate;
        }
        if(effectiveDate !== lastEffectiveDate) {
            const newCurrencyUpdateTime = new currencyUpdateTimeModel({effectiveDate: effectiveDate})
            await newCurrencyUpdateTime.save()
            await dispatchCurrenciesTable(res.data[0], effectiveDate);
        }
    }).catch(error => {
        console.log("Cannot fetch NBP data to DB ", error)
    });
}

async function dispatchCurrenciesTable(res, effectiveDate) {
    await res.rates.forEach(item => {
        const {currency, code, mid} = item;
        const currencyItem = new currencyModel({currency: currency, code: code, mid: mid, effectiveDate: effectiveDate});
        currencyItem.save();
    })
}

//manually update the last table

// checkIfUpdateFromRemoteAvailable().catch(error => {
//     if(error){
//         console.log('Update currencies error ', error);
//     }
// })


//functions exposed by our server and DB

async function findOne(req, res, next) {
    const currency = await currencyModel.find({ code: req.params.code })
        .catch(error => {
            if(error)
                console.log("Cannot fetch currency ", error)
        })
    if (!currency) return next();
    return res.status(200).send({ currency: currency });
}

/**
 * Funkcja dostępna jedynie dla admin'a (duża ilość przesyłanych danych może wyrzucić błąd
 */

async function findAll(req, res, next) {
    if(await authController.verifyIfAdmin(req,res,next)) {
        const currencies = await currencyModel.find()
            .catch(error => {
                if (error)
                    console.log("Cannot fetch currencies ", error)
            })
        return res.status(200).send({currencies: currencies});
    }
    return res.status(401).send("Available for admin only");

}

async function findAllByDay(req, res, next) {
    const currencies = await currencyModel.find({effectiveDate: req.params.effectiveDate})
        .catch(error => {
            if (error)
                console.log("Cannot fetch currencies ", error)
        })
    return res.status(200).send({ currencies: currencies });
}

async function findOneByDay(req, res, next) {
    const currency = await currencyModel.findOne({ code: req.params.code, effectiveDate: req.params.effectiveDate })
        .catch(error => {
            if(error)
                console.log("Cannot fetch currency ", error)
        })
    if (!currency) return next();
    return res.status(200).send({ currency: currency });
}

async function getUpdateDate(req,res, next){
    let effectiveDate;
    await currencyUpdateTimeModel.find().sort({effectiveDate: -1})
        .then( async res => {
            effectiveDate = res[0].effectiveDate;
        })
        .catch(error => {
            if(error)
                console.log("Cannot fetch currency ", error)
        })
    if (!effectiveDate) return next();
    return res.status(200).send({effectiveDate: effectiveDate});
}

async function update(req, res, next) {
    if(await authController.verifyIfAdmin(req,res,next)) {
        checkIfUpdateFromRemoteAvailable()
            .catch(error => {
                if (error) {
                    console.log('Update currencies error ', error);
                    return res.status(400).send('Cannot update database', error);
                }
            })
            .then(() => {
                return res.status(200).send('Database updated');
            })
    }
    return res.status(401).send("Available for admin only");
}

async function fetchOldData(req, res, next) {
    if(await authController.verifyIfAdmin(req,res,next)) {
        fetchPastCurrenciesTables()
            .catch(error => {
                if (error) {
                    console.log('Update currencies error ', error);
                    return res.status(400).send('Cannot update database (fetch old data)', error);
                }
            })
            .then(() => {
                return res.status(200).send('Past currencies tables fetched successfully');
            })
    } else {
        return res.status(401).send("Available for admin only");
    }
}





module.exports = {findOne,findOneByDay ,findAll,findAllByDay, checkIfUpdateFromRemoteAvailable, fetchPastCurrenciesTables, getUpdateDate, update, fetchOldData}

