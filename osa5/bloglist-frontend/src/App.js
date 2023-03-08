import { useEffect } from 'react'
import Users from './components/Users'
import User from './components/User'
import Login from './components/Login'
import Menu from './components/Menu'
import Notification from './components/Notification'
import Bloglist from './components/Bloglist'
import Blog from './components/Blog'
import { initiateBlogs } from './reducers/blogsReducer'
import { initiateUser } from './reducers/userReducer'
import { initiateAllUsers } from './reducers/allUsersReducer'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route, Navigate } from 'react-router-dom'
import './index.css'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(initiateBlogs())
    dispatch(initiateUser())
    dispatch(initiateAllUsers())
  }, [dispatch])

  return (
    <div className="container">
      {!user ? (
        <div>
          <Notification />
          <Login />
        </div>
      ) : (
        <div>
          <Menu loggedIn={user.name} />
          <Notification />
          {/* <h2 className="mb-3 mt-4">blog app</h2> */}
          <Routes>
            <Route path="/blogs/:id" element={<Blog />} />
            <Route path="/users/:id" element={<User />} />
            <Route path="/blogs" element={<Bloglist />} />
            <Route path="/users" element={<Users />} />
            <Route path="/" element={<Navigate replace to="/blogs" />} />
          </Routes>
        </div>
      )}
    </div>
  )
}

export default App
