import React from 'react'
import { connect } from 'react-redux'
import { compose } from "recompose"
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import Hidden from '@material-ui/core/Hidden'

const styles = () => ({
  root: {
    width: '100%',
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  cellStars: {
    whiteSpace: 'nowrap'
  },
  bookmark: {
    color: 'rgba(0,0,0,.4)',
    cursor: 'pointer',
    '&:hover': {
      color: 'rgba(0,0,0,.8)'
    }
  }
})

const AppTable = (props) => {
  const { 
    classes, 
    entries, 
    isLoadingBookmarks, 
    onOpenDialog, 
    onAddBookmark } = props

  const colGroup = [20, 20, 15, 35, 10].map((size, index) => (
    <col width={`${size}%`} key={index + size} />
  ))


  return (
    <div className={classes.root}>
      <div className={classes.tableWrapper}>
        <Table 
          aria-labelledby="tableTitle" 
          style={{ tableLayout: "auto" }}
        >
          <colgroup>
            {colGroup}
          </colgroup>
          <TableBody>
            {entries.map(entry => {
              return (
                <TableRow
                  hover
                  key={entry.id}
                >
                  <TableCell className={classes.cell}>
                    {entry.full_name}
                  </TableCell>
                  <Hidden xsDown>
                    <TableCell align="right" className={classes.cell}>{entry.owner.login}</TableCell>
                  </Hidden>
                  <TableCell align="right" className={classes.cellStars}>
                    <i className="far fa-star"> {entry.stargazers_count}</i>
                  </TableCell>
                  <TableCell align="right" className={classes.cell}>
                    <a href={entry.html_url} 
                      target="_blank" 
                      rel="noopener noreferrer">
                      {entry.html_url}
                    </a>
                  </TableCell>
                  <TableCell align="right" className={classes.cell}>
                    {!isLoadingBookmarks 
                      ? (<span className={classes.bookmark}>
                          {!entry.bookmark
                            ? (<span 
                                onClick={() => onAddBookmark(entry)} 
                                title="Add to bookmarks">
                                <i className="far fa-bookmark"></i>
                              </span>)
                            : (<span 
                                onClick={() => onOpenDialog(entry.bookmark)}
                                title="Edit bookmark">
                                <i className="fas fa-bookmark"></i>
                              </span>)}
                      </span>)
                      : null
                    }
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

AppTable.propTypes = {
  classes: PropTypes.object.isRequired,
  entries: PropTypes.array.isRequired,
  isLoadingBookmarks: PropTypes.bool,
  onOpenDialog: PropTypes.func.isRequired,
  onAddBookmark: PropTypes.func.isRequired,
}

const mapStateToProps = ({ bookmarks }) => {
  return {
    isLoadingBookmarks: bookmarks.isLoading
  }
}

export default compose(
  connect(mapStateToProps),
  withStyles(styles)
)(AppTable)