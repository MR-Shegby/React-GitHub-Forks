import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Search from '../components/AppSearch'

const styles = theme => ({
  root: {
    margin: '15px 120px',
    textAlign: 'center',
    [theme.breakpoints.down('xs')]: {
      margin: '15px 15px',
    }, 
  },
  logo: {
    fontSize: 130,
    [theme.breakpoints.down('xs')]: {
      fontSize: 60,
    }, 
  },
  welcomeHeader: {
    marginTop: 20,
    fontSize: '2.3em',
    lineHeight: '1.2em',
    fontWeight: 600,
    [theme.breakpoints.down('xs')]: {
      marginTop: 10,
      fontSize: '1.5em',
    }, 
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 300,
    lineHeight: 1.5,
    margin: '20px 0',
    [theme.breakpoints.down('xs')]: {
      fontSize: '1em',
    }, 
  },
  search: {
    textAlign: 'center',
    maxWidth: 500,
    margin: '0 auto'
  }
})

const Home = (props) => {
    const { classes} = props

    return (
      <div className={classes.root}>
        <div className={classes.logo}>
          <i className="fab fa-github"></i>
        </div>
        <div className={classes.welcomeHeader}>
          GitHub Forks App
        </div>
        <div className={classes.welcomeText}>
          App shows forks of searched repository in table data view 
        </div>
        <div className={classes.search}>
          <Search />
        </div>
      </div>
    )
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Home)