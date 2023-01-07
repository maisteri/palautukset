const mongoose = require('mongoose')
const supertest = require('supertest')
const Blog = require('../models/blog')
const listHelper = require('../utils/list_helper')
const app = require('../app')
const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(listHelper.blogList)
})

describe('get all blogs', () => {
  
  test('number of returned blogs is 6', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(6)
  })
  
  test('blog id field must be id, not _id', async () => {
    const response = await api.get('/api/blogs')
    response.body.forEach((blog) => {
      expect(blog.id).toBeDefined()
    })
  })

})

describe('new blog add', () => {
  
  const newBlog = {
    title: 'new test blog',
    author: 'new author',
    url: 'test.url',
    likes: 99
  }

  test('adding a new blog succeeds', async () => {
    await api
      .post('/api/blogs/')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(listHelper.blogList.length + 1)
    expect(response.body.map(blog => {
      delete blog.id
      return blog
    })).toContainEqual(newBlog)

  })

  test('likes defaults to 0 if not defined', async () => {
    const newBlog = {
      title: 'new test blog',
      author: 'new author',
      url: 'test.url'
    }

    await api
      .post('/api/blogs/')
      .send(newBlog)
      .expect(201)
      .expect(res => 'likes' in res.body)
      .expect(res => res.body.likes === 0)
  })

  test('blog must include title and url', async () => {
    const newBlogNoUrl = {
      title: 'new test blog',
      author: 'new author',
      likes: 0
    }
    
    const newBlogNoTitle = {
      url: 'test.url',
      author: 'new author',
      likes: 0
    }

    await api
      .post('/api/blogs/')
      .send(newBlogNoTitle)
      .expect(400)
    
    await api
      .post('/api/blogs/')
      .send(newBlogNoUrl)
      .expect(400)
  })

})

describe('single blog delete', () => {

  test('deleting a blog succeeds', async () => {
    const response = await api.get('/api/blogs')
    await api.delete(`/api/blogs/${response.body[0].id}`)
      .expect(200)
    const res = await api.get('/api/blogs')
    expect(res.body).toHaveLength(5)

  })
})

afterAll(() => {
  mongoose.connection.close()
})