import axios from 'axios'

import {
  FETCH_FORKS_REQUEST,
  FETCH_FORKS_SUCCESS,
  FETCH_FORKS_FAILURE,
  FETCH_REPOSITORY_REQUEST,
  FETCH_REPOSITORY_SUCCESS,
  FETCH_REPOSITORY_FAILURE
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

const fetchRepository = (name) => async (dispatch) => {
  try {
    dispatch(repositoryRequested())

    const repo = await axios.get(`https://api.github.com/repos/${name}`)

    dispatch(repositoryFetched(repo.data))

  } catch(err) {
    dispatch(repositoryError(err.message))
  }
}

const fetchForks = (name, page) => async (dispatch) => {
  try {
    dispatch(forksRequested())

    const forks = await axios.get(`https://api.github.com/repos/${name}/forks?page=${page}&per_page=25`)

    dispatch(forksFetched(forks.data))

  } catch (err) {
    dispatch(forksError(err.message))
  }
}

export {
  fetchRepository,
  fetchForks
}