const currencyModel = require('../models/currencies').currencyModel
const currencyUpdateTimeModel = require('../models/currenciesUpdateTime').currencyUpdateTimeModel
const axios = require('axios')


//functions updating automatically our database

async function checkIfUpdateFromRemoteAvailable(){
    await currencyUpdateTimeModel.find()
        .then(async res => {
            if(res[0].effectiveDate === undefined){
                const newCurrencyUpdateTime = new currencyUpdateTimeModel({effectiveDate: "1970-01-01" });
                await newCurrencyUpdateTime.save().then(() => {
                    updateCurrencies();
                })
            }
            else{
                const today = new Date();
                const date = String(today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate());
                if(res[0].effectiveDate !== date){
                    await updateCurrencies();
                }
            }
        })
        .catch(error => {
            console.log("At checkIfUpdateFromRemoteAvailable ", error);
        })
}

async function updateCurrencies(){
    await axios.get('http://api.nbp.pl/api/exchangerates/tables/B', {
        headers : {
            Accept: "application/json"
        }
    }).then(async res => {
        let effectiveDate;
        for (const item of res.data) {
            effectiveDate = item.effectiveDate;
        }
            const currenciesUpdateTimeCollection = currencyUpdateTimeModel.collection;
            await currenciesUpdateTimeCollection.updateOne({}, {$set: {effectiveDate: effectiveDate}});
            await dispatchCurrenciesTable(res.data);

    }).catch(error => {
        console.log("Cannot fetch NBP data to DB ", error)
    });
}

async function dispatchCurrenciesTable(res) {
    await res.forEach(items => {
        if(items.rates){
            items.rates.forEach(item => {
                const {currency, code, mid} = item;
                const currencyItem = new currencyModel({currency: currency, code: code, mid: mid});
                currencyItem.save();
            })
        }
    })
}

checkIfUpdateFromRemoteAvailable().catch(error => {
    if(error){
        console.log('Update currencies error ', error);
    }
})


//functions exposed by our server and DB

async function findOne(req, res, next) {
    const currency = await currencyModel.findOne({ slug: req.params.slug })
        .catch(error => {
            if(error)
                console.log("Cannot fetch currency ", error)
        })
    if (!currency) return next();
    return res.status(200).send({ currency: currency });
}

async function findAll(req, res) {
    const currencies = await currencyModel.find()
        .catch(error => {
            if (error)
                console.log("Cannot fetch currencies ", error)
        })
    return res.status(200).send({ currencies: currencies });
}


module.exports = {findOne, findAll, checkIfUpdateFromRemoteAvailable};

