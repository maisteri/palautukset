import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import LoggedIn from './components/LoggedIn'
import BlogCreate from './components/BlogCreate'
import Notification from './components/Notification'
import './index.css'
import Togglable from './components/Togglable'
import { useDispatch, useSelector } from 'react-redux'
import { initiateBlogs } from './reducers/blogsReducer'
import { initiateUser } from './reducers/userReducer'

const App = () => {
  
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [visible, setVisible] = useState(false)

  const dispatch = useDispatch()
  const sortedBlogs = useSelector((state) => state.blogs)
  const user = useSelector(state => state.user)

  useEffect(() => {
    dispatch(initiateBlogs())
    dispatch(initiateUser())
  }, [dispatch])

  return (
    <div>
      {!user ? (
        <div>
          <Notification />
          <Login
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
          />
        </div>
      ) : (
        <div>
          <h2>blogs</h2>
          <Notification />
          <LoggedIn name={user.name} />
          <Togglable
            buttonLabel="new blog"
            visible={visible}
            setVisible={setVisible}
          >
            <BlogCreate setVisible={setVisible} />
          </Togglable>
          {sortedBlogs.map((blog) => (
            <Blog
              creatorLoggedIn={blog.user.username === user.username}
              key={blog.id}
              blog={blog}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default App
