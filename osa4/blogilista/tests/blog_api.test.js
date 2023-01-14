const mongoose = require('mongoose')
const supertest = require('supertest')
const Blog = require('../models/blog')
const listHelper = require('../utils/list_helper')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')
const User = require('../models/user')


beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(listHelper.blogList)

  await User.deleteMany({})
  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({ username: 'root', passwordHash, name: 'Root User' })
  await user.save()
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

describe('single blog modification of likes', () => {

  test('modifying the first blog likes by +19', async () => {
    const response = await api.get('/api/blogs')
    const oldTotalLikes = listHelper.totalLikes(response.body)
    let blog = response.body[0]
    blog = { ...blog, likes: blog.likes + 19 }

    await api.put(`/api/blogs/${blog.id}`)
      .send(blog)
      .expect(200)
    const res = await api.get('/api/blogs')
    expect(listHelper.totalLikes(res.body)).toBe(oldTotalLikes + 19)
  })
})

describe('malformed users cant be created', () => {

  test('password cant be less than 3 characters', async () => {
    const newUser = {
      username: 'test',
      name: 'Testi Testi',
      password: 'te',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const users = await User.find({})
    const usernames = users.map(user => user.username)
    expect(usernames).not.toContain(newUser.username)
  })

  test('username cant be less than 3 characters', async () => {
    const newUser = {
      username: 'te',
      name: 'Testi Testi',
      password: 'testtest',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const users = await User.find({})
    const usernames = users.map(user => user.username)
    expect(usernames).not.toContain(newUser.username)
  })

  test('username must be unique', async () => {
    const newUser = {
      username: 'root',
      name: 'Testi Testi',
      password: 'testtest',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
  })

})


afterAll(() => {
  mongoose.connection.close()
})