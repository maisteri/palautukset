import { useDispatch, useSelector } from 'react-redux'
import { useMatch, useNavigate } from 'react-router-dom'
import { deleteBlog, likeBlog } from '../reducers/blogsReducer'
import Comments from './Comments'

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
    <div>
      <h2>
        {blog.title}, {blog.author}
      </h2>
      <div>
        <a href={blog.url}>{blog.url}</a>
      </div>
      <div>
        {blog.likes} likes{' '}
        <button id="likeButton" onClick={handleLike}>
          like
        </button>
      </div>
      <div>{blog.user.name}</div>
      <button
        style={{ display: creatorLoggedIn ? 'inline' : 'none' }}
        className="btn-delete"
        onClick={handleDelete}
      >
        remove
      </button>
      <Comments comments={blog.comments} id={blog.id} />
    </div>
  )
}

export default Blog
