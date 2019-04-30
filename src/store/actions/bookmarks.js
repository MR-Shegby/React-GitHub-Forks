import {
  FETCH_BOOKMARKS_REQUEST,
  FETCH_BOOKMARKS_SUCCESS,
  FETCH_BOOKMARKS_FAILURE,
  LOAD_BOOKMARKS,
  ADD_BOOKMARK_SUCCESS,
  ADD_TO_BOOKMARKS,
  UPDATE_BOOKMARK_SUCCESS,
  UPDATE_BOOKMARK,
  DELETE_BOOKMARK_SUCCESS,
  DELETE_FROM_BOOKMARKS
} from '../actionTypes.js'

const bookmarksRequested = () => {
  return {
    type: FETCH_BOOKMARKS_REQUEST,
  }
}

const bookmarksLoaded = (data) => {
  return {
    type: FETCH_BOOKMARKS_SUCCESS,
    data
  }
}

const bookmarksError = (error) => {
  return {
    type: FETCH_BOOKMARKS_FAILURE,
    error
  }
}

const loadBookmarks = () => {
  return {
    type: LOAD_BOOKMARKS
  }
}

const bookmarkAdded = (id, data) => {
  return {
    type: ADD_BOOKMARK_SUCCESS,
    id,
    data
  }
}

const addToBookmarks = (fork) => {
  return {
    type: ADD_TO_BOOKMARKS,
    fork
  }
}

const bookmarkUpdated = (id, data) => {
  return {
    type: UPDATE_BOOKMARK_SUCCESS,
    id,
    data
  }
}

const editBookmark = (id, data) => {
  return {
    type: UPDATE_BOOKMARK,
    id,
    data
  }
}

const bookmarkDeleted = (id) => {
  return {
    type: DELETE_BOOKMARK_SUCCESS,
    id
  }
}

const deleteFromBookmarks = (id) => {
  return {
    type: DELETE_FROM_BOOKMARKS,
    id
  }
}

export {
  loadBookmarks,
  addToBookmarks,
  editBookmark,
  deleteFromBookmarks,
  bookmarksRequested,
  bookmarksLoaded,
  bookmarksError,
  bookmarkAdded,
  bookmarkUpdated,
  bookmarkDeleted
}