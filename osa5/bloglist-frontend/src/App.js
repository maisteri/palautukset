import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import blogService from './services/blogs'
import loginService from './services/login'
import LoggedIn from './components/LoggedIn'
import BlogCreate from './components/BlogCreate'
import Notification from './components/Notification'
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [notificationMessage, setNotificationMessage] = useState('')
  const [notificationMessageType, setNotificationMessageType] = useState('')
  
  const notify = (message, type) => {
    setNotificationMessage(message)
    setNotificationMessageType(type)
      setTimeout(() => {
        setNotificationMessage('')
        setNotificationMessageType('')
      }, 3000)
  }
  
  const handleBlogCreation = async (event) => {
    event.preventDefault()
    try {
      const blog = await blogService.create({
        author,
        title,
        url
      }, user.token)
      setBlogs(blogs.concat(blog))
      notify(`a new blog ${title} by ${author} added!`, 'success')
    } catch (exception) {
      notify(exception.response.data.error, 'error')
    }
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({username, password})
      setUser(user)
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      notify(`Nice to see you again ${user.name}!`, 'success')
    } catch (exception) {
      console.log(exception)
      notify(exception.response.data.error, 'error')
    }
      setPassword('')
      setUsername('')
  }

  const handleLogout = (event) => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
    
  }, [])
  
  return (
    <div>
      { user === null
        ?
        <div> 
          <Notification 
            message={notificationMessage} 
            type={notificationMessageType} />
          <Login 
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
            handleLogin={handleLogin} />
        </div>
        :
        <div>
          <h2>blogs</h2>
          <Notification 
            message={notificationMessage} 
            type={notificationMessageType} />
          <LoggedIn 
            name={user.name}
            handleLogout={handleLogout} />
          <BlogCreate
            handleBlogCreation={handleBlogCreation}
            title={title}
            setTitle={setTitle}
            author={author}
            setAuthor={setAuthor}
            url={url}
            setUrl={setUrl} />
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      }
    </div>
  )
}

export default App
