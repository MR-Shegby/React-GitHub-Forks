import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'

import Search from './AppSearch'

const styles = theme => ({
  logo: {
    fontSize: 36,
    flexGrow: 1
  },
  searchField: {
    minWidth: 340,
    [theme.breakpoints.down('xs')]: {
      minWidth: 240,
    }, 
  }
})

const GitForksAppBar = (props) =>  {

  const {classes} = props

  return (
    <AppBar position="static" color="default">
      <Toolbar>
        <Link to="/" className={classes.logo}>
          <i className="fab fa-github"></i>
        </Link>
        <div className={classes.searchField}>
          <Search/>
        </div>
      </Toolbar>
    </AppBar>
  )
}

GitForksAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(GitForksAppBar)