import { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { postAnecdote } from '../reducers/anecdoteReducer';
import { showNotificationWithTimeout } from '../reducers/notificationReducer';
const AnecdoteForm = () => {
    
  const dispatch = useDispatch()
  const anecdoteInput = useRef()

  const add = (event) => {
    event.preventDefault()
    const content = anecdoteInput.current.value
    anecdoteInput.current.value = ''
    dispatch(postAnecdote(content))
    dispatch(showNotificationWithTimeout(`You added '${content}'`, 5))
  }

  return(
    <div>
    <h2>create new</h2>
    <form onSubmit={add}>
      <div>
        <input ref={anecdoteInput} />
      </div>
    <button type="submit">create</button>
    </form>
    </div>
  )
}
export default AnecdoteForm