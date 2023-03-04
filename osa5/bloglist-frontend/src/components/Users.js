import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Users = (props) => {
  const blogs = useSelector((state) => state.blogs)
  const users = useSelector((state) => state.allUsers)

  return (
    <>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <td></td>
            <td>
              <b>blogs created</b>
            </td>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            const numberOfBlogs = blogs.reduce(
              (sum, blog) => (blog.user.name === user.name ? sum + 1 : sum),
              0
            )
            return (
              <tr key={user.id}>
                <td>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </td>
                <td>{numberOfBlogs}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}

export default Users
