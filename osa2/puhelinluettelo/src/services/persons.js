import axios from "axios"
const baseUrl = '/api/persons'

const readAll = () => {
  return axios.get(baseUrl).then(response => response.data)
}

const create = newPerson => {
  const request = axios.post(baseUrl, newPerson)
  return request.then(response => response.data)
}

const deleteEntry = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}

const update = (id, newPerson) => {
  const request = axios.put(`${baseUrl}/${id}`, newPerson)
  return request.then(response => response.data)
}

const persons = {
  readAll,
  create,
  deleteEntry,
  update
}

export default persons