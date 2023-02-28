import { useDispatch } from 'react-redux'
import { setUser } from '../reducers/userReducer'

const LoggedIn = ({ name }) => {
  const dispatch = useDispatch()

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogAppUser')
    dispatch(setUser(null))
  }

  return (
    <div>
      <p>
        {name} logged in
        <button onClick={handleLogout}>Logout</button>
      </p>
    </div>
  )
}

export default LoggedIn
