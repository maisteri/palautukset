import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogsReducer'

const BlogCreate = ({ setVisible }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const dispatch = useDispatch()

  const handleBlogCreation = (event) => {
    event.preventDefault()
    setTitle('')
    setAuthor('')
    setUrl('')
    setVisible(false)
    dispatch(createBlog(title, author, url))
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleBlogCreation}>
        <div>
          title:
          <input
            id="title"
            type="text"
            value={title}
            name="Blog title"
            placeholder="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            id="author"
            type="text"
            value={author}
            name="Blog author"
            placeholder="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            id="url"
            type="text"
            value={url}
            name="Blog url"
            placeholder="test.url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button id="createButton" type="submit">
          create
        </button>
      </form>
    </div>
  )
}

export default BlogCreate
