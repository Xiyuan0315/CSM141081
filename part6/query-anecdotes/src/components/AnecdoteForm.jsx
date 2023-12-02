import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdotes } from '../requests'
const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const newAnecMutation = useMutation({
    mutationFn: createAnecdotes,
    onSuccess: () => {
     queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
   })

 const addAnecdotes = async (event) => {
   event.preventDefault()
   const content = event.target.content.value
   event.target.content.value = ''
   newAnecMutation.mutate({ content, votes: 0})
 }


  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={addAnecdotes}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
