const dburl = require('./database')
// required environment variables
// ['NODE_ENV','PORT'].forEach((name) => {
//     if (!process.env[name]) {
//         throw new Error(`Environment variable ${name} is missing`)
//     }
// });

const configValues = {
    //env: process.env.NODE_ENV,
    server: {
        port: Number(process.env.PORT || 3001),
        database: process.env.DATABASE || dburl.mongoUrl,
        // TOKEN_SECRET_JWT: 'jWt9982_s!tokenSecreTqQrtw'
    },
    serverURL: 'http://localhost:3001'
};


module.exports = {configValues};

