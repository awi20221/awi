const axios = require("axios");

const axiosAPI = axios.create({
    baseURL : "http://localhost:3000"
})

module.exports = {axiosAPI}