import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import {
  setSuccessNotification,
  setErrorNotification,
} from './notificationReducer'

const initialState = []

const highestLikesOnTop = (a, b) => b.likes - a.likes

const blogsSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    append(state, action) {
      state.push(action.payload)
      return state.sort(highestLikesOnTop)
    },
    setBlogs(state, action) {
      return action.payload.sort(highestLikesOnTop)
    },
    remove(state, action) {
      return state.filter((blog) => blog.id !== action.payload)
    },
  },
})

export const initiateBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    const sure = window.confirm('Are you sure?')
    try {
      if (sure) {
        const blog = await blogService.remove(id)
        dispatch(remove(id))
        dispatch(
          setSuccessNotification(
            `deleted a blog ${blog.title} by ${blog.author}!`,
            3
          )
        )
      }
    } catch (exception) {
      dispatch(
        setErrorNotification(
          exception.response.data.error || exception.response.data,
          3
        )
      )
    }
  }
}

export const createBlog = (title, author, url) => {
  return async (dispatch) => {
    try {
      const blog = await blogService.create({
        author,
        title,
        url,
      })
      dispatch(append(blog))
      dispatch(
        setSuccessNotification(`a new blog ${title} by ${author} added!`, 3)
      )
    } catch (exception) {
      dispatch(
        setErrorNotification(
          exception.response.data.error || exception.response.data,
          3
        )
      )
    }
  }
}

export const { append, remove, setBlogs } = blogsSlice.actions

export default blogsSlice.reducer
