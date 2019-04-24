import {
  FETCH_BOOKMARKS_REQUEST,
  FETCH_BOOKMARKS_SUCCESS,
  FETCH_BOOKMARKS_FAILURE,
  ADD_BOOKMARK_SUCCESS,
  UPDATE_BOOKMARK_SUCCESS,
  DELETE_BOOKMARK_SUCCESS,
} from '../actionTypes.js'

const initialState = {
  bookmarks: {},
  isLoading: true,
  error: null
}

const bookmarksReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BOOKMARKS_REQUEST:
      return {
        bookmarks: {},
        isLoading: true,
        error: null
      }

    case FETCH_BOOKMARKS_SUCCESS:
      return {
        bookmarks: action.data,
        isLoading: false,
        error: null
      }

    case FETCH_BOOKMARKS_FAILURE:
      return {
        bookmarks: {},
        isLoading: false,
        error: action.error
      }

    case ADD_BOOKMARK_SUCCESS:
      return {
        bookmarks: { ...state.bookmarks, [action.id]: action.data},
        error: null
      }

    case UPDATE_BOOKMARK_SUCCESS:
      const upBookmark = { ...state.bookmarks[action.id], ...action.data }
      return {
        bookmarks: { ...state.bookmarks, [action.id]: upBookmark },
        error: null
      }

    case DELETE_BOOKMARK_SUCCESS:
      const bookmarks = { ...state.bookmarks}
      delete bookmarks[action.id]
      return {
        bookmarks: {...bookmarks},
        error: null
      }
      
    default:
      return state
  }
}

export default bookmarksReducer