import axios from 'axios'

import {
  UPDATE_INPUT_VALUE,
  CLEAR_SUGGESTIONS,
  MAYBE_UPDATE_SUGGESTIONS,
  LOAD_SUGGESTIONS_BEGIN,
  ERROR_SUGGESTIONS
} from '../actionTypes.js'

function updateInputValue(value) {
  return {
    type: UPDATE_INPUT_VALUE,
    value
  }
}

function clearSuggestions() {
  return {
    type: CLEAR_SUGGESTIONS
  }
}

function loadSuggestionsBegin() {
  return {
    type: LOAD_SUGGESTIONS_BEGIN
  }
}

function maybeUpdateSuggestions(suggestions, value) {
  return {
    type: MAYBE_UPDATE_SUGGESTIONS,
    suggestions,
    value
  }
}

function errorSuggestions(error) {
  return {
    type: ERROR_SUGGESTIONS,
    error
  }
}

const loadSuggestions = (value) => (dispatch) => {
  dispatch(loadSuggestionsBegin())

  if (value) {
    axios.get(
      `https://api.github.com/search/repositories?q=${value}+in:name&per_page=5`,
      {auth: {
          username: 'Shegby22',
          password: 'Shegby262'}})
      .then((res) => {
        dispatch(maybeUpdateSuggestions(res.data.items, value))
      })
      .catch((err) => {
        dispatch(errorSuggestions('Too many requests. Try later!'))
      })
  }
}

export {
  updateInputValue,
  loadSuggestions,
  clearSuggestions
}