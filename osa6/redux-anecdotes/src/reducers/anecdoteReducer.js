import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const asObject = (anecdote) => {
  return {
    content: anecdote,
    votes: 0
  }
}

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    append(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const initiateAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (anecdote) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.create(asObject(anecdote))
    dispatch(append(newAnecdote))
  }
}

export const vote = (id) => {
  return async (dispatch, getState) => {
    const state = getState().anecdotes
    const votedAnecdote = state.find( anecdote => anecdote.id === id )
    const modifiedAnecdote = { ...votedAnecdote, votes: votedAnecdote.votes + 1 }
    const newState = state.map(
      anecdote => anecdote.id === id ?
        modifiedAnecdote :
        anecdote
    )
    dispatch(setAnecdotes(newState))
    await anecdoteService.update(id, modifiedAnecdote)
  }
}

export const { append, setAnecdotes } = anecdoteSlice.actions
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