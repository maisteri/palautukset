const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const { userExtractor } = require('../utils/middleware')

blogsRouter.get('/', (request, response) => {
  Blog
    .find({})
    .populate('user')
    .then(blogs => {
      response.json(blogs)
    })
})

blogsRouter.post('/', userExtractor, (request, response, next) => {
  let tempBlog = request.body
  if ( !('likes' in tempBlog) ) {
    tempBlog = { ...tempBlog, likes: 0 }
  }

  User.findById(request.user)
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

blogsRouter.delete('/:id', userExtractor, async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id)
    if (blog.user.toString() === request.user) {
      const result = await Blog.findByIdAndDelete(request.params.id)
      response.status(200).json(result)
    } else {
      response.status(401).json({ error: 'You are not the owner of this blog entry' })
    }
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.put('/:id', userExtractor, async (request, response, next) => {
  try {
    const modifiedBlog = request.body
    console.log(request.body)
    const result = await Blog.findByIdAndUpdate(request.params.id, modifiedBlog, { new: true })
    response.status(200).json(result)
  } catch (exception) {
    next(exception)
  }
})

module.exports = blogsRouter