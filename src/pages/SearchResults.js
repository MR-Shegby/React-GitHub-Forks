import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from "recompose"
import PropTypes from 'prop-types'
import queryString from 'query-string'

import { withStyles } from '@material-ui/core/styles'
import LinearProgress from '@material-ui/core/LinearProgress'
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Pagination from "material-ui-flat-pagination";
import Hidden from '@material-ui/core/Hidden'

import AppBar from '../components/AppBar'
import TableSearchList from '../components/AppTable'
import ToggleBookmarksModal from '../components/ToggleBookmarksModal'
import ErrorIndicator from '../components/ErrorIndicator'
import { fetchForks, fetchRepository } from '../store/actions/searchResults'
import { fetchBookmarks, addToBookmarks } from '../store/actions/bookmarks'

const theme = createMuiTheme({
  typography: {useNextVariants: true}
})

const styles = theme => ({
  root: {
    margin: '40px 60px',
    [theme.breakpoints.down('xs')]: {
      margin: '15px 10px',
    }, 
  },
  title: {
    fontSize: '2rem',
    [theme.breakpoints.down('xs')]: {
      fontSize: '1.5rem',
    }, 
  },
  counter: {
    fontSize: '0.875rem',
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
    lineHeight: 1.75,
    fontWeight: 500,
    letterSpacing: '0.02857em',
  },
  linearColorPrimary: {
    backgroundColor: '#b2dfdb',
  },
  linearBarColorPrimary: {
    backgroundColor: '#00695c',
  },
  pagination: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '20px 0'
  },
  right: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  zeroResults: {
    marginTop: 30,
    textAlign: 'center'
  },
  resultsBox: {
    minHeight: 300
  }
})

const getPage = (pathname) => 
  queryString.parse(pathname).page

const getRepository = (search) =>
  queryString.parse(search).repository

class SearchResults extends Component {
  state = { 
    offset: 0,
    dialog: false,
    savedData: null
  }

  componentDidMount() {
    const { 
      location, 
      fetchForks, 
      fetchRepository, 
      fetchBookmarks } = this.props

    const page = getPage(location.pathname)
    const repository = getRepository(location.search)

    fetchRepository(repository)
    fetchForks(repository, page)
    fetchBookmarks()

    this.setState({
      offset: (page - 1) * 25
    })
  }

  componentDidUpdate(prevProps) {
    const { location, fetchForks, fetchRepository } = this.props

    const page = getPage(location.pathname)
    const repository = getRepository(location.search)

    if (this.props.location.search !== prevProps.location.search) {
      fetchRepository(repository)
      fetchForks(repository, page)
    }

    if (this.props.location.pathname !== prevProps.location.pathname) {
      fetchForks(repository, page)

      this.setState({
        offset: (page - 1) * 25
      })
    }
  }

  handleClick(offset) {
    this.setState({ offset });

    const page = offset / 25 + 1
    const repository = queryString.parse(this.props.location.search).repository

    this.props.history.push({
      pathname: `/search&page=${page}`,
      search: `?repository=${repository}`
    })
  }

  onAddBookmark = (data) => {
    this.props.addToBookmarks(data)
    this.openDialog(data)
  }

  openDialog = (data) => {
    this.setState({
      dialog: true,
      savedData: data
    })
  }

  closeDialog = () => {
    this.setState({
      dialog: false,
      savedData: null
    })
  }

  render() {
    const { 
      classes, 
      repo, 
      forks, 
      isForksLoading, 
      isRepositoryLoading, 
      forksError,
      repositoryError,
      bookmarks} = this.props

    const { offset, dialog, savedData } = this.state

    const forkData = forks.map(fork => {
      const forkId = fork.id.toString()
      if (bookmarks && Object.keys(bookmarks).includes(forkId)) {
        return { ...fork, bookmark: {...bookmarks[forkId]}}
      }
      return { ...fork}
    })

    const paginationBox = (
      <div className={classes.pagination}>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <Pagination
            limit={25}
            offset={offset}
            total={repo.forks_count}
            onClick={(e, offset) => this.handleClick(offset)}
          />
        </MuiThemeProvider>
        <Hidden xsDown>
          <span className={classes.counter}>
            <span>{1 + offset}</span>—
            {repo.forks_count > 25 && repo.forks_count > 25 + offset
              ? <span>{25 + offset} / </span>
              : null
            }
            <span>{repo.forks_count} forks results</span>
          </span>
        </Hidden>
      </div>)

    const linearProgresBox = 
      <LinearProgress
        variant="indeterminate"
        classes={{
          colorPrimary: classes.linearColorPrimary,
          barColorPrimary: classes.linearBarColorPrimary}}/>

    const tableSearchListBox = 
      <TableSearchList
        entries={forkData}
        onAddBookmark={this.onAddBookmark}
        onOpenDialog={this.openDialog} />

    const errorBox = 
      <ErrorIndicator
        message="Failed to load data"
        vertical="top"
        positionRelative
        open
      />

    const toggleBookmarksModalBox = 
      <ToggleBookmarksModal
        open={dialog}
        onClose={this.closeDialog}
        data={savedData}
      />

    const dataError = forksError || repositoryError

    return (
      <React.Fragment>
        <AppBar />
        {isForksLoading || isRepositoryLoading ? linearProgresBox: null}

        {dataError ? errorBox : null}

        {!isRepositoryLoading && !dataError
          ? (<div className={classes.root}>
            <h1 className={classes.title}>Forks of {repo.full_name}</h1>
            {repo.forks_count
              ? (<React.Fragment>
                  {paginationBox}

                  {!isForksLoading 
                    ? (<React.Fragment>
                        {tableSearchListBox}
                        {paginationBox}
                      </React.Fragment>)
                    : null}

                  

                  {toggleBookmarksModalBox}
                </React.Fragment>)
              : (<div className={classes.zeroResults}>0 forks</div>)}
          </div>)
          : null
        }

      </React.Fragment>
    )
  }
}

SearchResults.propTypes = {
  classes: PropTypes.object.isRequired,
  repo: PropTypes.object.isRequired,
  forks: PropTypes.array.isRequired,
  bookmarks: PropTypes.object.isRequired,
  isForksLoading: PropTypes.bool,
  isRepositoryLoading: PropTypes.bool,
  forksError: PropTypes.string,
  repositoryError: PropTypes.string,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  fetchForks: PropTypes.func.isRequired,
  fetchRepository: PropTypes.func.isRequired,
  fetchBookmarks: PropTypes.func.isRequired,
  addToBookmarks: PropTypes.func.isRequired,
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchForks: (repository, page) => dispatch(fetchForks(repository, page)),
    fetchRepository: (repository) => dispatch(fetchRepository(repository)),
    fetchBookmarks: () => dispatch(fetchBookmarks()),
    addToBookmarks: (fork) => dispatch(addToBookmarks(fork)),
  }
}

const mapStateToProps = ({ searchResults, bookmarks}) => {
  return {
    repo: searchResults.repo,
    forks: searchResults.forks,
    isForksLoading: searchResults.forksLoading,
    isRepositoryLoading: searchResults.repositoryLoading,
    forksError: searchResults.forksError, 
    repositoryError: searchResults.repositoryError, 
    bookmarks: bookmarks.bookmarks
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(SearchResults)