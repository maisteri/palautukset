import { useDispatch, useSelector } from 'react-redux'
import { useMatch, useNavigate } from 'react-router-dom'
import { deleteBlog, likeBlog } from '../reducers/blogsReducer'
import Comments from './Comments'
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'

const Blog = (props) => {
  const navigate = useNavigate()
  const thisBlogId = useMatch('/blogs/:id').params.id
  const blog = useSelector((state) =>
    state.blogs.find((blog) => blog.id === thisBlogId)
  )
  const user = useSelector((state) => state.user)

  const dispatch = useDispatch()

  if (!user || !blog) {
    return null
  }
  const creatorLoggedIn = user.username === blog.user.username

  const handleDelete = (event) => {
    event.preventDefault()
    dispatch(deleteBlog(blog.id))
    navigate('/blogs')
  }

  const handleLike = (event) => {
    event.preventDefault()
    dispatch(likeBlog(blog.id))
  }

  return (
    <ListGroup>
      <ListGroup.Item>
        {blog.title}, {blog.author}
      </ListGroup.Item>
      <ListGroup.Item>
        <a href={blog.url}>{blog.url}</a>
      </ListGroup.Item>
      <ListGroup.Item>
        {blog.likes} likes{' '}
        <Button id="likeButton" size="sms" onClick={handleLike}>
          like
        </Button>
      </ListGroup.Item>
      <ListGroup.Item>{blog.user.name}</ListGroup.Item>
      <ListGroup.Item style={{ display: creatorLoggedIn ? 'inline' : 'none' }}>
        <Button variant="danger" onClick={handleDelete}>
          remove
        </Button>
      </ListGroup.Item>
      <ListGroup.Item>
        <Comments comments={blog.comments} id={blog.id} />
      </ListGroup.Item>
    </ListGroup>
  )
}

export default Blog
