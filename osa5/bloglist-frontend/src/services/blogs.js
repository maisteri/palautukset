import axios from 'axios'
const baseUrl = '/api/blogs'

const bearerToken = token => `bearer ${token}`

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (blog, token) => {
  const config = {
    headers: { Authorization: bearerToken(token) },
  }

  const response = await axios.post(baseUrl, blog, config)
  return response.data
}

export default { getAll, create }