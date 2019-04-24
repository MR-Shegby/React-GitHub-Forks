import database from '../../firebase'

import {
  FETCH_BOOKMARKS_REQUEST,
  FETCH_BOOKMARKS_SUCCESS,
  FETCH_BOOKMARKS_FAILURE,
  ADD_BOOKMARK_SUCCESS,
  UPDATE_BOOKMARK_SUCCESS,
  DELETE_BOOKMARK_SUCCESS,
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

const bookmarkAdded = (id, data) => {
  return {
    type: ADD_BOOKMARK_SUCCESS,
    id,
    data
  }
}

const bookmarkUpdated = (id, data) => {
  return {
    type: UPDATE_BOOKMARK_SUCCESS,
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


const fetchBookmarks = () => async (dispatch) => {
  try {
    dispatch(bookmarksRequested())

    const bookmarksRef = await database.ref(`bookmarks`).once('value')
    const bookmarks = bookmarksRef.val()

    dispatch(bookmarksLoaded(bookmarks))

  } catch (err) {
    dispatch(bookmarksError(err))
  }
}

const addToBookmarks = (fork) => async (dispatch) => {
  const bookmark = {
    id: fork.id,
    name: fork.full_name, 
    url: fork.html_url,
  }

  database.ref(`bookmarks/${fork.id}`).set(bookmark)
    .then(() => {
      dispatch(bookmarkAdded(fork.id, bookmark))
    })
    .catch(err => dispatch(bookmarksError(err)))
}

const editBookmark = (id, data) => async (dispatch) => {

  database.ref(`bookmarks/${id}`).update(data)
    .then(() => {
      dispatch(bookmarkUpdated(id, data))
    })
    .catch(err => dispatch(bookmarksError(err)))
}

const deleteFromBookmarks = (id) => async (dispatch) => {

  database.ref(`bookmarks/${id}`).remove()
    .then(() => {
      dispatch(bookmarkDeleted(id))
    })
    .catch(err => dispatch(bookmarksError(err)))
}

export {
  fetchBookmarks,
  addToBookmarks,
  editBookmark,
  deleteFromBookmarks
}