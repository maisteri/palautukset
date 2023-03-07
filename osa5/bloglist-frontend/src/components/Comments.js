import { useDispatch, useSelector } from 'react-redux'
import { commentBlog } from '../reducers/blogsReducer'
import { useState } from 'react'

const Comments = ({ comments, id }) => {
  const dispatch = useDispatch()
  const [comment, setComment] = useState('')

  const handleCommentCreation = (event) => {
    event.preventDefault()
    dispatch(commentBlog(id, comment))
    console.log(comment)
    setComment('')
  }

  if (!comments) return null
  return (
    <>
      <h3>comments</h3>
      <form onSubmit={handleCommentCreation}>
        <input
          id="comment"
          type="text"
          name="newcomment"
          value={comment}
          placeholder="comment here"
          onChange={({ target }) => setComment(target.value)}
        />
        <button id="commentButton" type="submit">
          add comment
        </button>
      </form>
      <ul>
        {comments.map((comment) => {
          return <li key={comment}>{comment}</li>
        })}
      </ul>
    </>
  )
}

export default Comments
