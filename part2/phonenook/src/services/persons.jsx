import axios from 'axios'
const baseUrl = 'http://localhost:3000/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => {
    return response.data
  })
}

const create = newObject => {
  return axios.post(baseUrl, newObject)
}

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
  // return request.then(response => response.data)
}

const remove = (id) =>{
  return axios.delete(`${baseUrl}/${id}`)
}

export default { getAll, create, update,remove}