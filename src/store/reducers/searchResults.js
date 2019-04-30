import {
  FETCH_FORKS_REQUEST,
  FETCH_FORKS_SUCCESS,
  FETCH_FORKS_FAILURE,
  FETCH_REPOSITORY_REQUEST,
  FETCH_REPOSITORY_SUCCESS,
  FETCH_REPOSITORY_FAILURE
} from '../actionTypes'

const initialState = {
  repo: {},
  forks: [],
  forksLoading: true,
  repositoryLoading: true,
  forksError: null,
  repositoryError: '',
}

const searchResultsReducer = (state = initialState, action) => {
  switch(action.type) {
    case FETCH_FORKS_REQUEST:
      return {
        ...state,
        forks: [],
        forksLoading: true,
        forksError: null
      }

    case FETCH_FORKS_SUCCESS:
      return {
        ...state,
        forks: action.forks,
        forksLoading: false,
        forksError: null
      }

    case FETCH_FORKS_FAILURE:
    console.log('action.error', action.error)
      return {
        ...state,
        forks: [],
        forksLoading: false,
        forksError: action.error
      }

    case FETCH_REPOSITORY_REQUEST:
      return {
        ...state,
        repo: {},
        repositoryLoading: true,
        repositoryError: ''
      }

    case FETCH_REPOSITORY_SUCCESS:
      return {
        ...state,
        repo: action.repo,
        repositoryLoading: false,
        repositoryError: ''
      }

    case FETCH_REPOSITORY_FAILURE:
      return {
        ...state,
        repo: {},
        repositoryLoading: false,
        repositoryError: action.error
      }

    default:
      return state
  }
}

export default searchResultsReducer