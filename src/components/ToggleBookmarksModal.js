import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from "recompose"
import isEqual from 'lodash/isEqual'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Typography from '@material-ui/core/Typography'

import { editBookmark, deleteFromBookmarks } from '../store/actions/bookmarks'

const styles = theme => ({
  root: {
    [theme.breakpoints.down('xs')]: {
      margin: '-38px -38px -38px',
    },
  },
  dialogContent: {
    width: 450,
    marginTop: 14,
    [theme.breakpoints.down('xs')]: {
      width: 300,
    },
  },
  formControl: {
    margin: '10px 0',
    [theme.breakpoints.down('xs')]: {
      maxWidth: 250,
    },
  },
  actions: {
    marginRight: 24,
    marginBottom: 12,
  }
})

const DialogTitle = withStyles(theme => ({
  root: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing.unit * 2,
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing.unit,
    top: theme.spacing.unit,
    color: theme.palette.grey[500],
  },
}))(props => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  )
})

class ToggleBookmarksModal extends Component {
  state = {
    name: '',
    url: ''
  }

  componentDidUpdate(prevProps) {
    if (this.props.data && !isEqual(this.props.data, prevProps.data)) {
      this.setState({
        name: this.props.data.full_name || this.props.data.name,
        url: this.props.data.html_url || this.props.data.url,
      })
    }
  }

  onEditBookmark = () => {
    const { name } = this.state
    const { data } = this.props

    this.props.editBookmark(data.id, {name})
    this.props.onClose()
  }

  onDeleteBookmark = () => {
    this.props.deleteBookmark(this.props.data.id)
    this.props.onClose()
  }

  onChangeName = (e) => {
    this.setState({
      name: e.target.value
    })
  }

  render() {
    const { classes, open, onClose, data } = this.props

    let title = data && data.full_name ? 'Bookmark added' : 'Edit bookmark'

    return (
      <Dialog
        className={classes.root}
        open={open}
        onClose={onClose}
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="customized-dialog-title" onClose={onClose}>
          {title}
        </DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <FormControl className={classes.formControl} fullWidth>
            <InputLabel htmlFor="name">Name</InputLabel>
            <Input id="name" value={this.state.name} onChange={this.onChangeName} />
          </FormControl>
          <FormControl className={classes.formControl} disabled fullWidth>
            <InputLabel htmlFor="component-disabled">URL</InputLabel>
            <Input id="component-disabled" value={this.state.url} />
          </FormControl>
        </DialogContent>
        <DialogActions className={classes.actions}>
          <Button
            onClick={this.onDeleteBookmark}
            color="default"
          >
            Remove
          </Button>
          <Button 
            variant="outlined" 
            onClick={() => this.onEditBookmark()}
            color="primary" 
            autoFocus
          >
            Done
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

ToggleBookmarksModal.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.object,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  deleteBookmark: PropTypes.func.isRequired,
  editBookmark: PropTypes.func.isRequired,
}

const mapDispetchToProps = (dispatch) => {
  return {
    deleteBookmark: (id) => dispatch(deleteFromBookmarks(id)),
    editBookmark: (id, data) => dispatch(editBookmark(id, data))
  }
}

export default compose(
  connect(null, mapDispetchToProps),
  withStyles(styles)
)(ToggleBookmarksModal)