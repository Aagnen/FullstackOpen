const { test, after } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app) //"superagent" object

test('notes are returned as json', async () => {
    await api
        .get('/api/notes')
        .expect(200)
        .expect('Content-Type', /application\/json/) //regex starts and ends with /, \to escape middle /
})

after(async () => {
    await mongoose.connection.close()
})