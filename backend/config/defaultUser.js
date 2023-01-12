const User = require('../models/user').userModel

async function isAdminExist() {
    const result = await User.find({role: 'ADMIN'}).exec();
    return result.length > 0
}

// Initialize first user
const initializeData = async () => {
    if(!await isAdminExist())
    {
        const user = new User({
                fullName: "administrator",
                role: "ADMIN",
                login: "admin",
                email: "awi2022.1.0@gmail.com",
                active: true
            });
        const password = "admin";
        await User.register(user, password).catch(error => {
            if(error)
                console.log("Error: cannot add default user ", error)
        })
    }
}

module.exports = {initializeData};
