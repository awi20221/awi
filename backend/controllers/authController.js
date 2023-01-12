const User = require('../models/user').userModel;
const jwt = require('jsonwebtoken');


/**
 *  Funckja umożliwiającą autentyfikację użytkownika podczas wywoływania metod post/put/delete w celu modyfikacji swojego konta,
 *  Konieczne sprawdzenie czy jest zalogowany jako użytkownik, którego chce modyfikować,
 *  Parametr konieczny do weryfikacji to :slug przekazywany jako parametr w req.params, jest to identyfikator danych któe chcemy zmienić
 *  Drugi parametr to req.user zwracany przez callback funkcji passport.authenticate
 *  Uwaga: ADMIN ma dostęp do wszystkich danych
 */

//TODO: czy slug w tej funkcji jest potrzebny ?
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


  async function login (req, res, next) {
        // generate token
        const accessToken = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: 1200 });
        return res.send({ accessToken});
    }


    //TODO: dodać potwierdzenie adresu email
    async function register(req, res, next) {
        const { fullName, login, email, password, role } = req.body;
        //check e-mail and login availability
        if(await isEmailAvailable(email)){
            if(await isLoginAvailable(login)){
                const user = new User({ fullName: fullName, login: login, email: email, role: role });
                await User.register(user, password);
                res.send('User created successfully');
                return;
            }
            return res.status(409);
            //return;
        }
        return res.status(409);
        //return;
    }

module.exports = {login,register, verifyRequestAvailability, verifyIfAdmin};
//module.exports = {login,register}; //ZMIANA TYMCZASOWA!


