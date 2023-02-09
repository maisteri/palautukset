import axios from 'axios'

const asObject = (anecdote) => {
  return {
    content: anecdote,
    votes: 0
  }
}

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (anecdote) => {
  const response = await axios.post(baseUrl, asObject(anecdote))
  return response.data
}

const exportables = { getAll, create }
export default exportables