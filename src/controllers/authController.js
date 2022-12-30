const User = require('../models/user').userModel;
const jwt = require('jsonwebtoken');


  async function login (req, res, next) {
        // generate token
        const accessToken = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: 1200 });
        //TODO:
        // const refreshToken = jwt.sign({id: req.user._id}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: 86400})
        return res.send({ accessToken});
    }


    //TODO: dodać obsługę błędów takich jak istniejacy juz email czy login

    //TODO: dodać potwierdzenie adresu email
    async function register(req, res, next) {
        const { login, email, password, role } = req.body;
        const user = new User({ login: login, email: email, role: role });
        await User.register(user, password);
        res.send('User created successfully.');
    }

module.exports = {login,register};


