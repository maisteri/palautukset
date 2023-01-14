const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')

const getTokenFrom = (request) => {
  const authHeader = request.get('authorization')
  if (authHeader && authHeader.toLowerCase().startsWith('bearer ')) {
    return authHeader.substring(7)
  }
  return null
}

blogsRouter.get('/', (request, response) => {
  Blog
    .find({})
    .populate('user')
    .then(blogs => {
      response.json(blogs)
    })
})

blogsRouter.post('/', (request, response, next) => {
  let tempBlog = request.body
  if ( !('likes' in tempBlog) ) {
    tempBlog = { ...tempBlog, likes: 0 }
  }

  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, config.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  User.findById(decodedToken.id)
    .then( result => {
      tempBlog = { ...tempBlog, user: result._id }
      const blog = new Blog(tempBlog)
      blog
        .save()
        .then(result => {
          response.status(201).json(result)
        })
        .catch(error => next(error))
    })
    .catch(error => next(error))
})

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    const result = await Blog.findByIdAndDelete(request.params.id)
    response.status(200).json(result)
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  try {
    const modifiedBlog = request.body
    const result = await Blog.findByIdAndUpdate(request.params.id, modifiedBlog, { new: true })
    response.status(200).json(result)
  } catch (exception) {
    next(exception)
  }
})

module.exports = blogsRouter