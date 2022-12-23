const User = require('../models/user');
const jwt = require('jsonwebtoken');

  async function login (req, res, next) {
        // generate token
        const accesToken = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: 1200 });
        // const refreshToken = jwt.sign({id: req.user._id}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: 86400})
        // return token
        return res.send({ accesToken});
    }

    async function register(req, res, next) {
        const { first_name, last_name, email, password } = req.body;
        const user = new User({ first_name, last_name, email });
        await User.register(user, password);

        res.send('User created successfully. Now you can log in.');
    }

    async function show(req,res){
        // res.set('Content-Type', 'text/html');
        // await res.sendFile(__dirname + '../../src/views/html/login.html');
        // res.render('html/login');
        console.log('show --> klik')
    }

    module.exports = {show,register, login};
