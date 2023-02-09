import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { vote, initiateAnecdotes } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/noficationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()

  useEffect( () => {
    dispatch(initiateAnecdotes())
  }, [dispatch])

  const anecdotes = useSelector(state => {
    return state.anecdotes.filter(
      anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
    )
  })

  const handleVote = (id) => {
    const anecdote = anecdotes.find(a => a.id === id)
    dispatch(vote(id))
    dispatch(setNotification(`you voted '${anecdote.content}'`, 10))
  }

  const sortedAnecdotes = anecdotes.sort((a, b) => b.votes - a.votes)
  return(
    <>
      { sortedAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}

export default AnecdoteList