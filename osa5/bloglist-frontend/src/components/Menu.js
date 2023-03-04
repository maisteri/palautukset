import { useDispatch } from 'react-redux'
import { setUser } from '../reducers/userReducer'
import { Link } from 'react-router-dom'

const Menu = ({ loggedIn }) => {
  const dispatch = useDispatch()

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogAppUser')
    dispatch(setUser(null))
  }

  const padding = {
    paddingRight: 5,
  }

  return (
    <div>
      <Link to="/blogs" style={padding}>
        blogs
      </Link>
      <Link to="/users" style={padding}>
        users
      </Link>
      {loggedIn} logged in <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Menu
