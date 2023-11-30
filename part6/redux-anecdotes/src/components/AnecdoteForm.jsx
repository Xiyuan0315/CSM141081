import { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
    
  const dispatch = useDispatch()
  const anecdoteInput = useRef()

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = anecdoteInput.current.value
    anecdoteInput.current.value = ''
    dispatch(createAnecdote(content))
  }

  return(
    <div>
    <h2>create new</h2>
    <form onSubmit={addAnecdote}>
      <div>
        <input ref={anecdoteInput} />
      </div>
    <button type="submit">create</button>
    </form>
    </div>
  )
}
export default AnecdoteForm