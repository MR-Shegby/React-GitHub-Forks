import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'
import Snackbar from '@material-ui/core/Snackbar'
import SnackbarContent from '@material-ui/core/SnackbarContent'
import ErrorIcon from '@material-ui/icons/Error'

const styles = theme => ({
  positionRelative: {
    position: 'relative',
  },
  content: {
    backgroundColor: theme.palette.error.dark,
    boxSizing: 'border-box'
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
})

const ErrorIndicator = (props) => {
  const { 
    classes,
    positionRelative = false, 
    message, 
    vertical = 'bottom',
    duration = null, 
    open, 
    handleClose } = props

  return (
    <Snackbar
      className={positionRelative ? classes.positionRelative: null}
      anchorOrigin={{
        vertical,
        horizontal: 'center',
      }}
      open={open}
      onClose={handleClose}
      autoHideDuration={duration}
    >
      <SnackbarContent
        className={classes.content}
        message={
          <span id="client-snackbar" className={classes.message}>
            <ErrorIcon className={classNames(classes.icon, classes.iconVariant)} />
            {message}
          </span>
        }
      />
    </Snackbar>
  )
}

ErrorIndicator.propTypes = {
  classes: PropTypes.object.isRequired,
  positionRelative: PropTypes.bool,
  message: PropTypes.string.isRequired,
  duration: PropTypes.number,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func
}

export default withStyles(styles)(ErrorIndicator)