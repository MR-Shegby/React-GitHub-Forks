import axios from 'axios'
import { put, call, takeLatest } from 'redux-saga/effects'
import { 
  loadSuggestionsBegin, 
  maybeUpdateSuggestions, 
  errorSuggestions } from '../actions/search'

function* asyncLoadSuggestions({ value }) {
  try {
    yield put(loadSuggestionsBegin())

    if (value) {
      const res = yield call(
        axios.get,
        `https://api.github.com/search/repositories?q=${value}+in:name&per_page=5`, {
          username: '*****',
          password: '*****'
        });

      yield put(maybeUpdateSuggestions(res.data.items, value))
    }

  } catch (err) {
    yield put(errorSuggestions('Too many requests. Try later!'))
  }
}

function* watchLoadSuggestions() {
  yield takeLatest('LOAD_SUGGESTIONS', asyncLoadSuggestions)
}

export {
  watchLoadSuggestions
}
