const sharesModel = require('../models/shares').shareModel
const sharesUpdateTimeModel = require('../models/sharesUpdateTime').shareUpdateTimeModel
const XLSX = require('xlsx')
const authController = require("./authController");



// async function downloadXls() {
//     try {
//         // https://www.gpw.pl/archiwum-notowan?fetch=1&type=10&instrument=&date=30-12-2022
//         const response = await axios({
//             method: 'GET',
//             url: 'https://www.gpw.pl/archiwum-notowan',
//             params: {
//                 fetch: '1',
//                 type: '10',
//                 instrument: '',
//                 date: '30-12-2022',
//             },
//             responseType: 'stream',
//         });
//         response.data.pipe(fs.createWriteStream('notowania.xls'));
//     } catch (error) {
//         console.error(error);
//     }
// }


async function getLocalXLSandParseToJSON(filePath){
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    return  XLSX.utils.sheet_to_json(sheet);
}


async function checkIfDataAlreadyInDB(effectiveDate){
    const sharesUpdateTimes = await sharesUpdateTimeModel.find({effectiveDate: effectiveDate}).sort({effectiveDate: -1});
    if(sharesUpdateTimes[0] === undefined){
        return false;
    }
    return true;
}

async function dispatchSharesTable(jsonTables) {
    console.log(jsonTables);
    await jsonTables.forEach(item => {
        const shareItem = new sharesModel({name: item.Nazwa , minimalRate: item['Kurs min'], maximalRate: item['Kurs max'], change: item.Zmiana, effectiveDate: item.Data});
        shareItem.save();
    })
}

async function saveToDB(filePath){
    const jsonFile = await getLocalXLSandParseToJSON(filePath)
        .catch(error => {
            console.log("Cannot get local file and convert it to json ", error)
        })
    if(!(await checkIfDataAlreadyInDB(String(jsonFile[0].Data)))){
        await dispatchSharesTable(jsonFile)
            .then( async () => {
                const newSharesUpdateTime = new sharesUpdateTimeModel({effectiveDate: jsonFile[0].Data})
                await newSharesUpdateTime.save()
            })
            .catch(error => {
                console.log("Cannot save shares tables to DB ", error);
            })
    }
}


//TODO: obsluzyc jakos sciezke do pliku
//saveToDB("C:/Users/kacpe/Downloads/_2023-01-02_akcje.xls")


//functions exposed by our server and DB

async function findOneCompany(req, res, next) {
    const share = await sharesModel.find({ name: req.params.name })
        .catch(error => {
            if(error)
                console.log("Cannot fetch currency ", error)
        })
    if (!share) return next();
    return res.status(200).send({ share: share });
}

async function findAll(req, res, next) {
    if(await authController.verifyIfAdmin(req,res,next)) {
        const shares = await sharesModel.find()
            .catch(error => {
                if (error)
                    console.log("Cannot fetch currencies ", error)
            })
        return res.status(200).send({shares: shares});
    }
    return res.status(200).send("Available for admin only");
}

async function findAllByDay(req, res, next) {
    const shares = await sharesModel.find({effectiveDate: req.params.effectiveDate})
        .catch(error => {
            if (error)
                console.log("Cannot fetch currencies ", error)
        })
    return res.status(200).send({ shares: shares });
}

async function findOneByDay(req, res, next) {
    const share = await sharesModel.findOne({ name: req.params.name, effectiveDate: req.params.effectiveDate })
        .catch(error => {
            if(error)
                console.log("Cannot fetch currency ", error)
        })
    if (!share) return next();
    return res.status(200).send({ share: share });
}

async function getUpdateDate(req,res, next){
    let effectiveDate;
    await sharesUpdateTimeModel.find().sort({effectiveDate: -1})
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

        //add a file path as a parameter in order to look up for it in req.body.path
//     await saveToDB(req.params.filePath )
//         .catch(error => {
//             if(error){
//                 console.log('Update currencies error ', error);
//                 return res.status(400).send('Cannot update database', error);
//             }
//         })
//         .then(()=> {
//             return res.status(200).send('Database updated');
//         })
        return res.status(200).send('As far, I don\'t do anything')
    }
    return res.status(200).send("Available for admin only");
}

module.exports = {findAll,findAllByDay,findOneByDay,findOneCompany,getUpdateDate,update}




