// import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { NotificationProvider,useNotification } from './components/NotificationContext';
import { getAnecdotes,updateAnecdotes ,createAnecdotes} from './requests'
const App = () => {

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1,
    refetchOnWindowFocus: false
  })
  const anecdotes = result.data
  const { dispatch } = useNotification()
  const queryClient = useQueryClient()

  const newAnecMutation = useMutation({
    mutationFn: createAnecdotes,
    onSuccess: () => {
     queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
    onError: (error) => {
      // Assuming error response has a message field. Adjust as per your API response.
      const errorMessage = error.response?.data?.message || 'too short anecdote, must have length 5 or more';
      dispatch({ type: 'SET_NOTIFICATION', payload: errorMessage });
      setTimeout(() => {
        dispatch({ type: 'CLEAR_NOTIFICATION' });
      }, 5000);
    }
   })

   const updateAnecMutation = useMutation({
    mutationFn: updateAnecdotes,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
  })

 const addAnecdotes = async (event) => {
   event.preventDefault()
   const content = event.target.anecdote.value
   event.target.anecdote.value = ''
  //  console.log(content)
   newAnecMutation.mutate({ content:content, votes: 0})
   dispatch({ type: 'SET_NOTIFICATION', payload: `Added new anecdote: '${content}'` });
   setTimeout(() => {
     dispatch({ type: 'CLEAR_NOTIFICATION' });
   }, 5000); // Hide notification after 5 seconds
 
 }

  const handleVote = (anecdote) => {

    updateAnecMutation.mutate({...anecdote, votes: anecdote.votes +1 })
    dispatch({ type: 'SET_NOTIFICATION', payload: `Voted on ${anecdote.content}` });
    setTimeout(() => {
      dispatch({ type: 'CLEAR_NOTIFICATION' });
    }, 5000); // Hide notification after 5 seconds
  
  }
  
  // const anecdotes = [
  //   {
  //     "content": "If it hurts, do it more often",
  //     "id": "47145",
  //     "votes": 0
  //   },
  // ]
  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  if (result.isError) {
    return <div>anecdote service is not available due to problems in server</div> 
  }
  return (
    // <NotificationProvider>
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      {/* <AnecdoteForm /> */}

      <h3>create new</h3>
      <form onSubmit={addAnecdotes}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>

    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
    // </NotificationProvider>
  )
}
const WrappedApp = () => (
  <NotificationProvider>
    <App />
  </NotificationProvider>
)

export default WrappedApp
