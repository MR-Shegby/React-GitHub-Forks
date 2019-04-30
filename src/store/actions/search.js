import {
  UPDATE_INPUT_VALUE,
  CLEAR_SUGGESTIONS,
  MAYBE_UPDATE_SUGGESTIONS,
  LOAD_SUGGESTIONS_BEGIN,
  ERROR_SUGGESTIONS,
  LOAD_SUGGESTIONS
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

function loadSuggestions(value) {
  return {
    type: LOAD_SUGGESTIONS,
    value
  }
}

export {
  loadSuggestionsBegin,
  maybeUpdateSuggestions,
  errorSuggestions,
  updateInputValue,
  clearSuggestions,
  loadSuggestions
}