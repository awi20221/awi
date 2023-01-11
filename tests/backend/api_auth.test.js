const mongoose = require('mongoose');
const userModel = require("../../backend/models/user").userModel
const MONGO_URI = require('../../backend/config/database').mongoUrl
const request = require('supertest');




describe('register', () => {

    beforeAll(async () => {
        await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    })

    afterAll(async () => {
        await userModel.findOneAndDelete({login: 'test', email: 'test@gmail.com'})
        await mongoose.connection.close();
    });

    it('should register user or return appropriate response', async () => {

        const checkEmailAvailability = await userModel.find({email: 'test@gmail.com'})
        const checkLoginAvailability = await userModel.find({login: 'test'})

        if(checkEmailAvailability[0] !== undefined){
            const response = await request('http://localhost:3000/api')
                .post('/auth/register')
                .send({fullName: "test", login: "test", email: "test@gmail.com", password: "test", role: 'ADMIN'})
            expect(response.text).toBe('Email unavailable')
        }

        else if(checkLoginAvailability[0] !== undefined){
            const response = await request('http://localhost:3000/api')
                .post('/auth/register')
                .send({fullName: "test", login: "test", email: "test@gmail.com", password: "test", role: 'ADMIN'})
            expect(response.text).toBe('Login unavailable')
        }

        else {
            const response = await request('http://localhost:3000/api')
                .post('/auth/register')
                .send({fullName: "test", login: "test", email: "test@gmail.com", password: "test", role: 'ADMIN'})

            expect(response.text).toBe('User created successfully')

            const checkDB = await userModel.find({email: 'test@gmail.com', login: 'test', role: 'ADMIN'})
            expect(checkDB[0]).not.toBe(undefined)
        }
    });
});



describe('login', () => {

    beforeAll(async () => {
        await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        await request('http://localhost:3000/api')
            .post('/auth/register')
            .send({fullName: "test", login: "test", email: "test@gmail.com", password: "test", role: 'ADMIN'})
    })

    afterAll(async () => {
        await userModel.findOneAndDelete({login: 'test', email: 'test@gmail.com'})
        await mongoose.connection.close();
    });

    it('Should return access token', async () => {
        const response = await request('http://localhost:3000')
            .post('/auth/login')
            .send({login: 'test', password: 'test'})

        if(response.data !== undefined){
            let authHeader = "Bearer " + response.data;
            console.log(authHeader);
            const checkResponse = await request('http://localhost:3000')
                .get('/users')
                .set({Authorization: authHeader})

            expect(checkResponse.code).toBe(200)
            expect(checkResponse.body).not.toBe(undefined)
        }
    })
})

