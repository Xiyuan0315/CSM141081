const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data
    case 'CLEAR_NOTIFICATION':
      return null
    default:
      return state
  }
}
export const setNotification = (message, type = 'success', timeout = 5000) => {
    return async dispatch => {
      dispatch({
        type: 'SET_NOTIFICATION',
        data: { message, type }
      });
  
      setTimeout(() => {
        dispatch({
          type: 'CLEAR_NOTIFICATION'
        });
      }, timeout)
    }
  }
  
export default notificationReducer