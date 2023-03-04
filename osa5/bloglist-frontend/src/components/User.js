import { useSelector } from 'react-redux'
import { useMatch } from 'react-router-dom'

const User = (props) => {
  const blogs = useSelector((state) => state.blogs)
  const allUsers = useSelector((state) => state.allUsers)
  const match = useMatch('/users/:id')
  const user = match
    ? allUsers.find((user) => user.id === match.params.id)
    : null

  if (!user) {
    return null
  }
  return (
    <>
      <h2>{user.name}</h2>
      <b>added blogs</b>
      <ul>
        {blogs
          .filter((blog) => blog.user.username === user.username)
          .map((blog) => (
            <li key={blog.id}>{blog.title}</li>
          ))}
      </ul>
    </>
  )
}

export default User
