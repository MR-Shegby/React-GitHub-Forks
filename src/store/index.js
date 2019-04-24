import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

import searchResultsReducer from './reducers/searchResults'
import searchReducer from './reducers/search'
import bookmarksReducer from './reducers/bookmarks'

const reducer = combineReducers({
  searchResults: searchResultsReducer,
  search: searchReducer,
  bookmarks: bookmarksReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store