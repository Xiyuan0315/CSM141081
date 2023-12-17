import axios from 'axios'
const baseUrl = '/api/blogs'
let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (newBlog, token) => {
  const config = {
    headers: { Authorization: `bearer ${token}` },
  }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}
const update = async (id, updatedBlog) => {
  const response = await axios.put(`${baseUrl}/${id}`, updatedBlog)
  return response.data
}

const remove = async (id,token) => {
  const config = {
    headers: { Authorization: `bearer ${token}` },
  }
  await axios.delete(`${baseUrl}/${id}`,config);
}

const get = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
}
export default { getAll,setToken ,create,update,remove,get }