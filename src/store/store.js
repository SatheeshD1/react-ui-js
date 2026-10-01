import { createStore, combineReducers } from 'redux';
import searchReducer from '../reducers/searchReducer';
import payReducer from '../reducers/payReducer';

// Combine all your reducers into a single root reducer
const rootReducer = combineReducers({
  search: searchReducer,
  pay: payReducer
});

// Create the Redux store
const store = createStore(rootReducer);

export default store;