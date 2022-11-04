import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
  
  const [selected, setSelected] = useState(Math.floor(Math.random() * anecdotes.length))
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const buttonHandler = () => setSelected(Math.floor(Math.random() * anecdotes.length))

  const voteHandlder = () => {
    const newVotes = [...votes]
    newVotes[selected] += 1
    return (
      setVotes(newVotes)
    )}

  const Button = ({name, handler}) => <button onClick={handler}>{name}</button>
  const Anecdote = ({anecdote}) => <p>{anecdote}</p>
  const AnecdoteVoteCount = ({votes}) => <p>has {votes} votes</p>
  const AnecdoteMostVotes = ({anecdotes, votes}) => {
    let mostVotes = 0
    for (let i = 1; i < anecdotes.length; i++) {
      if (votes[i] > votes[mostVotes]) mostVotes = i
    }

    return (
      <>
        <Anecdote anecdote={anecdotes[mostVotes]} />
        <AnecdoteVoteCount votes={votes[mostVotes]} />
      </>
    )}

  return (
    <>
      <h1>Anecdote of the day</h1>
      <Anecdote anecdote={anecdotes[selected]} />
      <AnecdoteVoteCount votes={votes[selected]} />
      <Button name="vote" handler={voteHandlder}/>
      <Button name="next anecdote" handler={buttonHandler}/>
      <h1>Anecdote with most votes</h1>
      <AnecdoteMostVotes anecdotes={anecdotes} votes={votes}/>

    </>
  )
}

export default App