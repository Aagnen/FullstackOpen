const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const logger = require('../utils/logger')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogRouter.get('/:id', async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id)
    if (blog) {
      response.json(blog)
    } else {
      response.status(404).end()
    }
  } catch(exception) {
    next(exception)
  }
})
  
blogRouter.post('/', async(request, response, next) => {
    const body = request.body

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url || '',
      likes: body.likes || 0
    })
    logger.info('saving: ', blog)

    try {
      const savedNote = await blog.save()
      response.status(201).json(savedNote)
    } catch(exception) {
      next(exception)
    }
})

blogRouter.delete('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } catch(exception) {
    next(exception)
  }
})

blogRouter.put('/:id', (request, response, next) => {
  const body = request.body

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url || '',
    likes: body.likes || 0
  })

  Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    .then(updated => {
      response.json(updated)
    })
    .catch(error => next(error))
})
  
module.exports = blogRouter