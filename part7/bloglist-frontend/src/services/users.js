import axios from 'axios'

const baseUrl = '/api/users'
let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}
const getAllUsers = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const get = async (userId) => {
  const response = await axios.get(`${baseUrl}/${userId}`);
  return response.data;
}
export default { getAllUsers,get }
