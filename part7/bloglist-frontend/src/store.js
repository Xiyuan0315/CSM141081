import { createStore, combineReducers, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk'
import notificationReducer from './reducer/notificationReducer'
// Import other reducers if you have them

// Combine reducers
const rootReducer = combineReducers({
  notification: notificationReducer,
  // Include other reducers here
});

// Create store with rootReducer and middleware
const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
)
export default store 
