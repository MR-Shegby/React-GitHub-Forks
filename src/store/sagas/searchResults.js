import axios from 'axios'
import { put, call, takeLatest } from 'redux-saga/effects'

import {
  repositoryRequested,
  repositoryFetched,
  repositoryError,
  forksRequested,
  forksFetched,
  forksError
} from '../actions/searchResults'

function*  fetchRepositoryAsync({name}){
  try {
    yield put(repositoryRequested())

    const repo = yield call(
      axios.get, 
      `https://api.github.com/repos/${name}`)

    yield put(repositoryFetched(repo.data))

  } catch (err) {
    yield put(repositoryError(err.message))
  }
}

function* watchLoadRepository() {
  yield takeLatest('LOAD_REPOSITORY', fetchRepositoryAsync)
}

function* fetchForksAsync({name, page}) {
  try {
    yield put(forksRequested())

    const forks = yield call(
      axios.get, 
      `https://api.github.com/repos/${name}/forks?page=${page}&per_page=25`)

    yield put(forksFetched(forks.data))

  } catch (err) {
    yield put(forksError(err.message))
  }
}

function* watchLoadForks() {
  yield takeLatest('LOAD_FORKS', fetchForksAsync)
}

export {
  watchLoadRepository,
  watchLoadForks
}