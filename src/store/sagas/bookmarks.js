import database from '../../firebase'
import { put, call, takeLatest } from 'redux-saga/effects'
import {
  bookmarksRequested,
  bookmarksLoaded,
  bookmarksError,
  bookmarkAdded,
  bookmarkUpdated,
  bookmarkDeleted
} from '../actions/bookmarks'

function* fetchBookmarksAsync() {
  try {
    yield put(bookmarksRequested())

    const bookmarksRef = yield call(() => database.ref(`bookmarks`).once('value'))
    const bookmarks = bookmarksRef.val()

    yield put(bookmarksLoaded(bookmarks))

  } catch (err) {
    yield  put(bookmarksError(err))
  }
}

function* watchLoadBookmarks() {
  yield takeLatest('LOAD_BOOKMARKS', fetchBookmarksAsync)
}

function* addToBookmarksAsync({fork}){
  try {
    const bookmark = {
      id: fork.id,
      name: fork.full_name,
      url: fork.html_url,
    }
    yield call(() => database.ref(`bookmarks/${fork.id}`).set(bookmark))
    yield put(bookmarkAdded(fork.id, bookmark))
  } catch(err){
    yield put(bookmarksError(err))
  }
}

function* watchAddToBookmarks() {
  yield takeLatest('ADD_TO_BOOKMARKS', addToBookmarksAsync)
}

function* editBookmarkAsync({id, data}) {
  try {
    yield call(() => database.ref(`bookmarks/${id}`).update(data))
    yield put(bookmarkUpdated(id, data))
  } catch (err) {
    put(bookmarksError(err))
  }
}

function* watchEditBookmarks() {
  yield takeLatest('UPDATE_BOOKMARK', editBookmarkAsync)
}

function* deleteFromBookmarksAsync({id}) {
  try {
    yield call(() => database.ref(`bookmarks/${id}`).remove())
    yield put(bookmarkDeleted(id))
  } catch(err) {
      put(bookmarksError(err))
  }
}

function* watchDeleteFromBookmarks() {
  yield takeLatest('DELETE_FROM_BOOKMARKS', deleteFromBookmarksAsync)
}

export {
  watchLoadBookmarks,
  watchAddToBookmarks,
  watchEditBookmarks,
  watchDeleteFromBookmarks
}