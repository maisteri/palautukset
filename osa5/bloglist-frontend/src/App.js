import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import blogService from './services/blogs'
import loginService from './services/login'
import LoggedIn from './components/LoggedIn'
import BlogCreate from './components/BlogCreate'
import Notification from './components/Notification'
import './index.css'
import Togglable from './components/Togglable'
import { useDispatch, useSelector } from 'react-redux'
import { createBlog, initiateBlogs } from './reducers/blogsReducer'
import {
  setSuccessNotification,
  setErrorNotification,
} from './reducers/notificationReducer'

const App = () => {
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [visible, setVisible] = useState(false)

  const dispatch = useDispatch()
  const sortedBlogs = useSelector((state) => state.blogs)

  const addLike = async (blog) => {
    await blogService.update(blog.id, {
      user: blog.user.id,
      author: blog.author,
      title: blog.title,
      url: blog.url,
      likes: blog.likes + 1,
    })
  }

  const addBlog = async ({ title, author, url }) => {
    dispatch(createBlog(title, author, url))
    setVisible(false)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      dispatch(setSuccessNotification(`Nice to see you again ${user.name}!`, 3))
    } catch (exception) {
      dispatch(
        setErrorNotification(
          exception.response.data.error || exception.response.data,
          3
        )
      )
    }
    setPassword('')
    setUsername('')
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }

  useEffect(() => {
    dispatch(initiateBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  return (
    <div>
      {user === null ? (
        <div>
          <Notification />
          <Login
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
            handleLogin={handleLogin}
          />
        </div>
      ) : (
        <div>
          <h2>blogs</h2>
          <Notification />
          <LoggedIn name={user.name} handleLogout={handleLogout} />
          <Togglable
            buttonLabel="new blog"
            visible={visible}
            setVisible={setVisible}
          >
            <BlogCreate addBlog={addBlog} />
          </Togglable>
          {sortedBlogs.map((blog) => (
            <Blog
              creatorLoggedIn={blog.user.username === user.username}
              key={blog.id}
              blog={blog}
              addLike={addLike}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default App
