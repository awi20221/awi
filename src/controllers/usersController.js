const User = require('../models/user').userModel
const slugify = require('slugify')
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

//TODO: validate if password was changed during modification

async function findOne(req, res, next) {
    const user = await User.findOne({ slug: req.params.slug });
    if (!user) return next();
    return res.status(200).send({ user: user });
}

async function findAll(req, res) {
    const users = await User.find();
    return res.status(200).send({ users: users });
}


async function update(req, res, next) {
    const user = await User.find({ 'slug': req.params.slug });
    if (!user) return next();
    const usersCollection = User.collection;

    if(req.body.login && await validateLoginAccessibility(req.body.login)){
        const newSlug = slugify(req.body.login);
        await usersCollection.updateOne({'slug' : req.params.slug}, {$set: {login: req.body.login, slug: newSlug}})
            .catch(error => {
            console.log("Error: Cannot update user date ", error);
        })
    }

    if(req.body.email && await validateEmailAccessibility(req.body.email)){
        await usersCollection.updateOne({'slug' : req.params.slug}, { $set: {email: req.body.email}}).catch(error => {
            console.log("Error: Cannot update user date ", error);
        })
    }
    //TODO: zmiana hasła
    return res.status(200).send({message: `User updated successfully` });
}

async function remove(req, res, next) {
    const user = await User.findOne({ 'slug': req.params.slug });
    if (!user) return next();
    await user.remove();

    return res.status(200).send({ message: `User was removed` });
}


module.exports = {findOne, findAll, update, remove};