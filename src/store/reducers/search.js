import {
  UPDATE_INPUT_VALUE,
  CLEAR_SUGGESTIONS,
  MAYBE_UPDATE_SUGGESTIONS,
  LOAD_SUGGESTIONS_BEGIN,
  ERROR_SUGGESTIONS
} from '../actionTypes.js'

const initialState = {
  value: '',
  suggestions: [],
  isLoading: false,
  error: ''
};

function searchReducer(state = initialState, action = {}) {
  switch (action.type) {
    case UPDATE_INPUT_VALUE:
      return {
        ...state,
        value: action.value
      };

    case CLEAR_SUGGESTIONS:
      return {
        ...state,
        suggestions: []
      };

    case LOAD_SUGGESTIONS_BEGIN:
      return {
        ...state,
        error: '',
        isLoading: true
      };

    case MAYBE_UPDATE_SUGGESTIONS:
      // Ignore suggestions if input value changed
      if (action.value !== state.value) {
        return {
          ...state,
          isLoading: false
        };
      }

      return {
        ...state,
        suggestions: action.suggestions,
        isLoading: false
      };

    case ERROR_SUGGESTIONS:
      return {
        ...state,
        suggestions: [],
        isLoading: false,
        error: action.error,
      };

    default:
      return state;
  }
}

export default searchReducer