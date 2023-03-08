import ListGroup from 'react-bootstrap/ListGroup'
import { useSelector } from 'react-redux'
import Togglable from './Togglable'
import { useState } from 'react'
import BlogCreate from './BlogCreate'
import { Link } from 'react-router-dom'

const Bloglist = (props) => {
  const [visible, setVisible] = useState(false)
  const sortedBlogs = useSelector((state) => state.blogs)

  return (
    <>
      <Togglable
        buttonLabel="new blog"
        visible={visible}
        setVisible={setVisible}
      >
        <BlogCreate setVisible={setVisible} />
      </Togglable>
      <ListGroup variant="flush" className="pt-2">
        {sortedBlogs.map((blog) => {
          return (
            <ListGroup.Item>
              <Link to={`/blogs/${blog.id}`}>
                {blog.title}, {blog.author}
              </Link>
            </ListGroup.Item>
          )
        })}
      </ListGroup>
    </>
  )
}

export default Bloglist
