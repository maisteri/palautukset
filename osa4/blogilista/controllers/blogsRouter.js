const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

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

  User.find({})
    .then( result => {
      const justSomeUser = result[0]._id.toString()
      tempBlog = { ...tempBlog, user: justSomeUser }
      const blog = new Blog(tempBlog)
      blog
        .save()
        .then(result => {
          response.status(201).json(result)
        })
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