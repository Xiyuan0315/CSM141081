import axios from 'axios'
const baseUrl = 'http://localhost:3001/anecdotes'
export const getAnecdotes = () =>
axios.get(baseUrl).then(res => res.data)
export const createAnecdotes = newNote =>
  axios.post(baseUrl, newNote).then(res => res.data)
export const updateAnecdotes = updatedNote =>
axios.put(`${baseUrl}/${updatedNote.id}`, updatedNote).then(res => res.data)