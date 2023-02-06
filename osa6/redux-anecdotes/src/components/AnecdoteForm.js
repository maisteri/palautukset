import { useDispatch } from 'react-redux'
import { create } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const handleCreate = (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(create(anecdote))
  }

  return(
    <>
      <h2>create new</h2>
      <form onSubmit={handleCreate}>
        <div><input name='anecdote'/></div>
        <button type='submit'>create</button>
      </form>
    </>
  )
}

export default AnecdoteForm