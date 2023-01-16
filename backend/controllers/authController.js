const User = require('../models/user').userModel;
const jwt = require('jsonwebtoken');
const mailController = require('./mailController')

/**
 *  Funckja umożliwiającą autentyfikację użytkownika podczas wywoływania metod post/put/delete w celu modyfikacji swojego konta,
 *  Konieczne sprawdzenie czy jest zalogowany jako użytkownik, którego chce modyfikować,
 *  Parametr konieczny do weryfikacji to :slug przekazywany jako parametr w req.params, jest to identyfikator danych któe chcemy zmienić
 *  Drugi parametr to req.user zwracany przez callback funkcji passport.authenticate
 *  Uwaga: ADMIN ma dostęp do wszystkich danych
 */

async function verifyRequestAvailability(req, res, next){
    if( String(req.user.role) === "ADMIN"){
        return true;
    }else {
        const userToModify = await User.find({'slug': req.params.slug});
        if (String(req.user._id) === String(userToModify[0]._id)) {
            return true;
        }
        return false;
    }
}

async function verifyIfAdmin(req, res, next){
    if( String(req.user.role) === "ADMIN"){
        return true;
    }else
        return false;
}



async function isEmailAvailable(email){
    const res = await User.find({email: email}).exec();
    if(res[0] === undefined){
        return true;
    }
    return false;
}

async function isLoginAvailable(login){
    const res = await User.find({login: login});
    if(res[0] === undefined){
        return true;
    }
    return false;
}

async function isUserActivated(login){
    const res = await User.find({login: login}, 'active');
    if(res[0] !== undefined) {
        if (res[0].active === true) {
            return true;
        }
    }
    return false;
}

async function login (req, res, next) {
    if(await isUserActivated(req.body.login))
    {
        // generate token
        const accessToken = jwt.sign({id: req.user._id}, process.env.JWT_SECRET, {expiresIn: 1200});
        return res.status(200).send({accessToken});
    } else
        return res.status(409).send('Activate your account')
}


    async function register(req, res, next) {
        const { fullName, login, email, password, role } = req.body;
        //check e-mail and login availability
        if(await isEmailAvailable(email)){
            if(await isLoginAvailable(login)){
                const user = new User({ fullName: fullName, login: login, email: email, role: role });
                await User.register(user, password);
                await mailController.sendLaunchTServerMail(email, login)
                res.status(200).send('User created successfully, please click the activation link on your mail');
                return;
            }
            return res.status(410).send('Login not available');
        }
        return res.status(411).send('Email not available')
    }

async function activateAccount(req,res,next) {
    const userCollection = User.collection
    await userCollection.findOneAndUpdate({login: req.params.login}, {$set: {active: true}})
    return res.redirect(302, 'http://localhost:3000/login')
}


module.exports = {login,register, verifyRequestAvailability, verifyIfAdmin, activateAccount};


