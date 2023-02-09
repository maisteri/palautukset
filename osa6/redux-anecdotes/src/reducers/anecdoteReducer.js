import { createSlice } from '@reduxjs/toolkit'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
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
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { create, vote, setAnecdotes } = anecdoteSlice.actions
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