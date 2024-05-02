const { test, after, beforeEach, describe } = require('node:test')
const Blog = require('../models/blog')
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const assert = require('node:assert')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
  
    const blogObjects = helper.initialBlogs
      .map(b => new Blog(b))
    const promiseArray = blogObjects.map(b => b.save())
    await Promise.all(promiseArray)
})

test('all are returned', async () => {
    const response = await api.get('/api/blogs')
  
    assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
})

test('a specific can be viewed', async () => {
    const atStart = await helper.blogsInDb()
    const toView = atStart[0]
  
    const result = await api
      .get(`/api/blogs/${toView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
    assert.deepStrictEqual(result.body, toView)
})

test('a valid can be added', async () => {
    const newNote =     {
        title: "test 3",
        author: "author 3",
        url: "url 3",
        likes: 3
    }
  
    await api
      .post('/api/blogs')
      .send(newNote)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const notesAtEnd = await helper.blogsInDb()
    assert.strictEqual(notesAtEnd.length, helper.initialBlogs.length + 1)
  
    const contents = notesAtEnd.map(n => n.title)
    assert(contents.includes('test 3'))
})

test('without likes can be added', async () => {
    const newNote =     {
        title: "test 5",
        author: "author 5",
        url: "url 5",
    }
  
    await api
      .post('/api/blogs')
      .send(newNote)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const notesAtEnd = await helper.blogsInDb()
    assert.strictEqual(notesAtEnd.length, helper.initialBlogs.length + 1)
  
    const contents = notesAtEnd.map(n => n.title)
    assert(contents.includes('test 5'))
})

test('without url can be added', async () => {
    const newNote =     {
        title: "test 5",
        author: "author 5",
        likes: 5,
    }
  
    await api
      .post('/api/blogs')
      .send(newNote)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const notesAtEnd = await helper.blogsInDb()
    assert.strictEqual(notesAtEnd.length, helper.initialBlogs.length + 1)
  
    const contents = notesAtEnd.map(n => n.title)
    assert(contents.includes('test 5'))
})

test('without title cannot be added', async () => {
    const newNote =     {
        author: "author 4",
        url: "url 4",
        likes: 4
    }
  
    await api
      .post('/api/blogs')
      .send(newNote)
      .expect(400)
  
    const notesAtEnd = await helper.blogsInDb()
    assert.strictEqual(notesAtEnd.length, helper.initialBlogs.length)
})

test('without author cannot be added', async () => {
    const newNote =     {
        title: "title 6",
        url: "url 6",
        likes: 6
    }
  
    await api
      .post('/api/blogs')
      .send(newNote)
      .expect(400)
  
    const notesAtEnd = await helper.blogsInDb()
    assert.strictEqual(notesAtEnd.length, helper.initialBlogs.length)
})

describe('deletion of a note', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const notesAtStart = await helper.blogsInDb()
    const noteToDelete = notesAtStart[0]

    await api
      .delete(`/api/blogs/${noteToDelete.id}`)
      .expect(204)

    const notesAtEnd = await helper.blogsInDb()

    assert.strictEqual(notesAtEnd.length, helper.initialBlogs.length - 1)

    const contents = notesAtEnd.map(r => r.title)
    assert(!contents.includes(noteToDelete.title))
  })
})

after(async () => {
    await mongoose.connection.close()
})