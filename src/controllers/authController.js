const User = require('../models/user').userModel;
const jwt = require('jsonwebtoken');



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


  async function login (req, res, next) {
        // generate token
        const accessToken = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: 1200 });
        return res.send({ accessToken});
    }


    //TODO: dodać potwierdzenie adresu email
    async function register(req, res, next) {
        const { login, email, password, role } = req.body;
        //check e-mail and login availability
        if(await isEmailAvailable(email)){
            if(await isLoginAvailable(login)){
                const user = new User({ login: login, email: email, role: role });
                await User.register(user, password);
                res.send('User created successfully');
                return;
            }
            res.send('Login unavailable')
            return;
        }
        res.send('Email unavailable')
    }

module.exports = {login,register};


