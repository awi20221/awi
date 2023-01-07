const axios = require('axios').default;

const axiosAPI = axios.create({
    baseURL : "http://localhost:3000",
    'Content-Type': 'application/json'
})

module.exports = {axiosAPI}