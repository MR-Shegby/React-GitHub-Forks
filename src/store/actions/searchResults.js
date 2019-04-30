import {
  FETCH_FORKS_REQUEST,
  FETCH_FORKS_SUCCESS,
  FETCH_FORKS_FAILURE,
  LOAD_FORKS,
  FETCH_REPOSITORY_REQUEST,
  FETCH_REPOSITORY_SUCCESS,
  FETCH_REPOSITORY_FAILURE,
  LOAD_REPOSITORY
} from '../actionTypes'


const forksRequested = () => {
  return {
    type: FETCH_FORKS_REQUEST,
  }
}

const forksFetched = (forks) => {
  return {
    type: FETCH_FORKS_SUCCESS,
    forks
  }
}

const forksError = (error) => {
  return {
    type: FETCH_FORKS_FAILURE,
    error
  }
}

const loadForks = (name, page) => {
  return {
    type: LOAD_FORKS,
    name,
    page
  }
}

const repositoryRequested = () => {
  return {
    type: FETCH_REPOSITORY_REQUEST,
  }
}

const repositoryFetched = (repo) => {
  return {
    type: FETCH_REPOSITORY_SUCCESS,
    repo
  }
}

const repositoryError = (error) => {
  return {
    type: FETCH_REPOSITORY_FAILURE,
    error
  }
}

const loadRepository = (name) => {
  return {
    type: LOAD_REPOSITORY,
    name
  }
}

export {
  forksRequested,
  forksFetched,
  forksError,
  repositoryRequested,
  repositoryFetched,
  repositoryError,
  loadRepository,
  loadForks
}