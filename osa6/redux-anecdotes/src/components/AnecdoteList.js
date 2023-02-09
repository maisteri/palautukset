import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { vote, setAnecdotes } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/noficationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteList = () => {
  const dispatch = useDispatch()

  useEffect( () => {
    anecdoteService.getAll()
      .then((anecdotes) => {
        dispatch(setAnecdotes(anecdotes))
      })
  }, [dispatch])

  const anecdotes = useSelector(state => {
    console.log(state.filter)
    return state.anecdotes.filter(
      anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
    )
  })

  const handleVote = (id) => {
    dispatch(vote(id))
    dispatch(setNotification(`you voted '${anecdotes.find(a => a.id === id).content}'`))
    setTimeout(() => dispatch(removeNotification()), 5000)
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