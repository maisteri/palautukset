import { createSlice } from '@reduxjs/toolkit'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    vote(state, action) {
      //console.log(JSON.parse(JSON.stringify(state)))
      const votedAnecdote = state.find( anecdote => anecdote.id === action.payload )
      const modifiedAnecdote = { ...votedAnecdote, votes: votedAnecdote.votes + 1 }
      const newState = state.map(
        anecdote => anecdote.id === action.payload ?
          modifiedAnecdote :
          anecdote
      )
      return newState
    },
    create(state, action) {
      const newAnecdote = asObject(action.payload)
      return state.concat(newAnecdote)
    }
  }
})

export const { create, vote } = anecdoteSlice.actions
export default anecdoteSlice.reducer


// const reducer = (state = initialState, action) => {

//   switch(action.type) {
//     case 'VOTE':
//       const votedAnecdote = state.find( anecdote => anecdote.id === action.payload.id )
//       const modifiedAnecdote = { ...votedAnecdote, votes: votedAnecdote.votes + 1 }
//       const newState = state.map(
//         anecdote => anecdote.id === action.payload.id ?
//           modifiedAnecdote :
//           anecdote
//       )
//       return newState
//     case 'CREATE':
//       const newAnecdote = asObject(action.payload.anecdote)
//       return state.concat(newAnecdote)
//     default:
//       return state
//   }
// }

// export const vote = (id) => {
//   return {
//     type: 'VOTE',
//     payload: { 
//       id
//     }
//   }
// }

// export const create = (anecdote) => {
//   return {
//     type: 'CREATE', 
//     payload: { 
//       anecdote 
//     } 
//   }
// }
// export default reducer