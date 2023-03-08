import { useDispatch } from 'react-redux'
import { setUser } from '../reducers/userReducer'
import { Link } from 'react-router-dom'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'

const Menu = ({ loggedIn }) => {
  const dispatch = useDispatch()

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogAppUser')
    dispatch(setUser(null))
  }

  return (
    <Navbar bg="dark" variant="dark" className="mb-5">
      <Container>
        <Navbar.Brand href="/">blog app</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/blogs">blogs</Nav.Link>
          <Nav.Link href="/users">users</Nav.Link>
        </Nav>
        {loggedIn} logged in <button onClick={handleLogout}>Logout</button>
      </Container>
    </Navbar>
  )
}

export default Menu
