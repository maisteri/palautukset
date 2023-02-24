import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: { message: '', type: null },
  reducers: {
    setSuccess(state, action) {
      return {
        message: action.payload,
        type: 'success',
      }
    },
    setError(state, action) {
      return {
        message: action.payload,
        type: 'error',
      }
    },
    remove(state, action) {
      return {
        message: '',
        type: null,
      }
    },
  },
})

export const setSuccessNotification = (message, delay) => {
  return async (dispatch) => {
    dispatch(setSuccess(message))
    setTimeout(() => dispatch(remove()), delay * 1000)
  }
}

export const setErrorNotification = (message, delay) => {
  return async (dispatch) => {
    dispatch(setError(message))
    setTimeout(() => dispatch(remove()), delay * 1000)
  }
}

export const { setSuccess, setError, remove } = notificationSlice.actions

export default notificationSlice.reducer
