const User = require('../models/user').userModel
const slugify = require('slugify')
const authController = require('../controllers/authController');

// Validate email address
function validateEmailAccessibility(email) {
    return User.findOne({email: email}).then((result) => {
        return !result;
    });
}

function validateLoginAccessibility(login) {
    return User.findOne({login: login}).then((result) => {
        return !result;
    });
}
function validatePasswordComplexity(password){
    if(password.length >= 6){
        return true;
    }
    else
        return false;
}
async function findOne(req, res, next) {
    const user = await User.findOne({ slug: req.params.slug });
    if (!user) return next();
    return res.status(200).send({ user: user });
}

async function findOneById(req, res, next) {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) return next();
    return res.status(200).send({ user: user });
}

async function findAll(req, res, next) {
    if(await authController.verifyIfAdmin(req,res,next)) {
        const users = await User.find();
        return res.status(200).send({users: users});
    }
    return res.status(200).send("Available for admin only");

}

//TODO: update password
async function updatePassword(req,res,next) {
    if (await authController.verifyRequestAvailability(req, res, next)) {
        if(req.body.newPassword === undefined || !validatePasswordComplexity(req.body.newPassword)){
            return res.status(200).send("Cannot change password, check if it has min. 6 digit length");
        } else {
            return res.status(200).send("To be implemented...")
        }
    }
    return res.status(200).send("You do not have access to data you are trying to modify. Please log in to accurate account");
}



    async function update(req, res, next) {
    // if(await authController.verifyRequestAvailability(req,res,next)) {
        const slug = req.params.slug
        const usersCollection = User.collection;
        let responseMessage = "";

        if (req.body.login && await validateLoginAccessibility(req.body.login)) {
            const newSlug = slugify(req.body.login);
            await usersCollection.updateOne({'slug': slug}, {$set: {login: req.body.login, slug: newSlug}})
                .then(() => {
                    responseMessage += "login ";
                })
                .catch(error => {
                    console.log("Error: Cannot update user date ", error);
                })
        }

        if (req.body.email && await validateEmailAccessibility(req.body.email)) {
            await usersCollection.updateOne({'slug': slug}, {$set: {email: req.body.email}})
                .then(() => {
                    responseMessage += "email ";
                })
                .catch(error => {
                console.log("Error: Cannot update user date ", error);
            })
        }
        if(responseMessage.length) {
            return res.status(200).send({message: 'Updated: ' + responseMessage})
        }
        else{
            return res.status(400).send({message: `Update failed`})
        }
    // }
    // return res.status(401).send("You do not have access to data you are trying to modify. Please log in to accurate account");
}

async function remove(req, res, next) {
    // if(await authController.verifyRequestAvailability(req,res,next)) {
        const user = await User.findOne({'slug': req.params.slug});
        if (!user) return next();
        await user.remove();
        return res.status(200).send({message: `User was removed`});
    // }
    // return res.status(401).send("You do not have access to data you are trying to modify. Please log in to accurate account");
}


module.exports = {findOne, findAll, update, remove, updatePassword, findOneById};