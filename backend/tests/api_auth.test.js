const mongoose = require('mongoose');
const userModel = require("../models/user").userModel
const MONGO_URI = require('../config/database').mongoUrl
const request = require('supertest');
const {userModel: User} = require("../models/user");




describe('register', () => {

    beforeAll(async () => {
        await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        const result = await userModel.findOne({fullName: "testowy", login: "test", email: "test@gmail.com"});
        if(result !== null){
            userModel.findOneAndDelete({fullName: "testowy", login: "test", email: "test@gmail.com"})
        }
    })

    afterAll(async () => {
        await userModel.findOneAndDelete({login: 'test', email: 'test@gmail.com'})
        await mongoose.connection.close();
    });

    it('should register user', async () => {

        const response = await request('http://localhost:3001/api')
            .post('/auth/register')
            .send({fullName: "test", login: "test", email: "test@gmail.com", password: "test", role: 'USER'})

        expect(response.text).toBe('User created successfully, please click the activation link on your mail')

        const checkDB = await userModel.find({email: 'test@gmail.com', login: 'test', role: 'USER'})
        expect(checkDB[0]).not.toBe(undefined)

    });
});



describe('login', () => {

    beforeAll(async () => {
        await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        const result = await userModel.findOne({fullName: "testowy", login: "test", email: "test@gmail.com"});
        if(result !== null) {
            const user = new User({
                fullName: "testowy",
                role: "USER",
                login: "test",
                email: "test@gmail.com",
                active: true
            });
            const password = "test";
            await User.register(user, password)
        }
    })

    afterAll(async () => {
        await userModel.findOneAndDelete({login: 'test', email: 'test@gmail.com'})
        await mongoose.connection.close();
    });

    it('Should return access token', async () => {
        const response = await request('http://localhost:3001')
            .post('/auth/login')
            .send({login: 'test', password: 'test'})

        if(response.data !== undefined){
            let authHeader = "Bearer " + response.data;
            console.log(authHeader);
            const checkResponse = await request('http://localhost:3001')
                .get('/users')
                .set({Authorization: authHeader})

            expect(checkResponse.code).toBe(200)
            expect(checkResponse.body).not.toBe(undefined)
        }
    })
})

