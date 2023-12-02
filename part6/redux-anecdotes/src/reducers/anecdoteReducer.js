import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'
// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ]
export const initializeAnecdotes = createAsyncThunk(
  'anecdotes/fetchAnecdotes',
  async () => {
    const response = await axios.get('http://localhost:3001/anecdotes');
    return response.data;
  }
)

export const postAnecdote = createAsyncThunk(
  'anecdotes/addAnecdote',
  async (content) => {
    console.log(content)
    const newAnecdote = { content, votes: 0 };
    const response = await axios.post('http://localhost:3001/anecdotes', newAnecdote);
    return response.data;
  }
)
export const postvoteAnecdote = createAsyncThunk(
  'anecdotes/postvoteAnecdote',
  async (anecdote) => {
    console.log(anecdote.content)
    const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
    console.log(updatedAnecdote)
    const response = await axios.put(`http://localhost:3001/anecdotes/${anecdote.id}`, updatedAnecdote);
    
    return response.data;
  }
)
const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

// const initialState = anecdotesAtStart.map(asObject)
const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState:[],
  reducers: {
  
    // voteAnecdote(state, action) {
    //   const id = action.payload
    //   const anecdoteToChange = state.find(anecdote => anecdote.id === id);
    //   if (anecdoteToChange) {
    //     anecdoteToChange.votes++;
    //   }
    // },
    
    addAnecdote(state, action) {
      const newAnecdote = asObject(action.payload);
      state.push(newAnecdote)
    },
  },
  extraReducers: {
    [initializeAnecdotes.fulfilled]: (state, action) => {
      return action.payload;
    },
    [postAnecdote.fulfilled]: (state, action) => {
      state.push(action.payload)
    },
    [postvoteAnecdote.fulfilled]: (state, action) => {
      const updatedAnecdote = action.payload;
      return state.map(anecdote =>
        anecdote.id !== updatedAnecdote.id ? anecdote : updatedAnecdote
      );
    }
  }
})
export const { voteAnecdote, addAnecdote } = anecdoteSlice.actions;
export default anecdoteSlice.reducer

