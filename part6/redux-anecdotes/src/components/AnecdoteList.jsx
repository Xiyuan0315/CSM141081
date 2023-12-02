
import { useSelector, useDispatch } from 'react-redux';
import {postvoteAnecdote} from '../reducers/anecdoteReducer';
import { showNotificationWithTimeout } from '../reducers/notificationReducer';
const AnecdoteList = () =>{
    const dispatch = useDispatch();
    const anecdotes = useSelector(state => state.anecdotes);
    const filter = useSelector(state => state.filter);
    const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes);
    const anecdotesToShow = sortedAnecdotes.filter(anecdote =>
      anecdote.content.toLowerCase().includes(filter.toLowerCase())
    )

    const vote = (anecdote) => {
    dispatch(postvoteAnecdote(anecdote))
    dispatch(showNotificationWithTimeout(`You voted '${anecdote.content}'`, 5))
    }
    return (
        <div>
          {anecdotesToShow.map(anecdote =>
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote)}>vote</button>
              </div>
            </div>
          )}
        </div>
      )
}

export default AnecdoteList