const User = require('../models/user').userModel

async function isUsersExist() {
    const result = await User.find().exec();
    return result.length > 0
}

// Initialize first user
const initializeData = async () => {
    if(!await isUsersExist())
    {
        const user = new User({
                role: "ADMIN",
                login: "admin",
                email: "admin@admin.com",
            });
        const password = "admin";
        await User.register(user, password).catch(error => {
            if(error)
                console.log("Error: cannot add default user ", error)
        })
    }
}

module.exports = {initializeData};
