import Blog from './Blog'
import { useSelector } from 'react-redux'
import Togglable from './Togglable'
import { useState } from 'react'
import BlogCreate from './BlogCreate'
import { Link } from 'react-router-dom'

const Bloglist = (props) => {
  const [visible, setVisible] = useState(false)
  const sortedBlogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)

  return (
    <>
      <Togglable
        buttonLabel="new blog"
        visible={visible}
        setVisible={setVisible}
      >
        <BlogCreate setVisible={setVisible} />
      </Togglable>
      {sortedBlogs.map((blog) => {
        return (
          <div className="blogStyle">
            <Link to={`/blogs/${blog.id}`}>
              {blog.title}, {blog.author}
            </Link>
          </div>
        )
      })}
    </>
  )
}

export default Bloglist
