import { createStore, combineReducers, compose, applyMiddleware} from 'redux'

import createSagaMiddleware from 'redux-saga';
import { watchLoadSuggestions } from './sagas/search'
import { watchLoadRepository, watchLoadForks } from './sagas/searchResults'
import { 
  watchLoadBookmarks, 
  watchAddToBookmarks, 
  watchEditBookmarks,
  watchDeleteFromBookmarks } from './sagas/bookmarks'

import searchResultsReducer from './reducers/searchResults'
import searchReducer from './reducers/search'
import bookmarksReducer from './reducers/bookmarks'

const sagaMiddleware = createSagaMiddleware();

const reducer = combineReducers({
  searchResults: searchResultsReducer,
  search: searchReducer,
  bookmarks: bookmarksReducer
})

const composeEnhancers =
  typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    }) : compose;

const store = createStore(
  reducer, 
  composeEnhancers(applyMiddleware(sagaMiddleware))
)

sagaMiddleware.run(watchLoadSuggestions)
sagaMiddleware.run(watchLoadRepository)
sagaMiddleware.run(watchLoadForks)
sagaMiddleware.run(watchLoadBookmarks)
sagaMiddleware.run(watchAddToBookmarks)
sagaMiddleware.run(watchEditBookmarks)
sagaMiddleware.run(watchDeleteFromBookmarks)

export default store