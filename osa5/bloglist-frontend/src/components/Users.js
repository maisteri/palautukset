import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Table from 'react-bootstrap/Table'

const Users = (props) => {
  const blogs = useSelector((state) => state.blogs)
  const users = useSelector((state) => state.allUsers)

  return (
    <>
      <h2 className="mb-3">Users</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>user name</th>
            <th>blogs created</th>
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
      </Table>
    </>
  )
}

export default Users
