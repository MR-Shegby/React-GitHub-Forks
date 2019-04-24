import React from 'react'
import { connect } from 'react-redux'
import { compose } from "recompose"
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import debounce from 'lodash/debounce'
import Autosuggest from 'react-autosuggest'
import match from 'autosuggest-highlight/match'
import parse from 'autosuggest-highlight/parse'

import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import MenuItem from '@material-ui/core/MenuItem'
import { withStyles } from '@material-ui/core/styles'

import { 
  updateInputValue, 
  loadSuggestions, 
  clearSuggestions } from '../store/actions/search'

function renderInputComponent(inputProps) {
  const { classes, inputRef = () => { }, ref, ...other } = inputProps

  return (
    <TextField
      fullWidth
      InputProps={{
        inputRef: node => {
          ref(node)
          inputRef(node)
        },
        classes: {
          input: classes.input,
        },
      }}
      {...other}
    />
  )
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
  const matches = match(suggestion.full_name, query)
  const parts = parse(suggestion.full_name, matches)

  return (
    <MenuItem selected={isHighlighted} component="div">
      <div>
        {parts.map((part, index) =>
          part.highlight ? (
            <span key={String(index)} style={{ fontWeight: 500 }}>
              {part.text}
            </span>
          ) : (
              <strong key={String(index)} style={{ fontWeight: 300 }}>
                {part.text}
              </strong>
            ),
        )} 
       </div>
    </MenuItem>
  )
}

const getSuggestionValue = suggestion => {
  return suggestion.full_name
}

const onSuggestionSelected = (props, event, { suggestion }) => {
  props.clearInput()

  props.history.push({
    pathname: '/search&page=1',
    search: `?repository=${suggestion.full_name}`,
    state: { repository: suggestion }
  })
}

const styles = theme => ({
  root: {
    flexGrow: 1,
    position: 'relative',
    width: '100%',
  },
  container: {
    position: 'relative',
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
  suggestion: {
    display: 'block',
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
  loadingStatus: {
    position: 'absolute',
    top: -10,
    right: 0,
    fontSize: 13
  },
  divider: {
    height: theme.spacing.unit * 2,
  },
  error: {
    color: 'red'
  }
})

const Search = (props) => {
    const { 
      classes, 
      value, 
      suggestions, 
      isLoading,
      error, 
      onChange, 
      onSuggestionsFetchRequested, 
      onSuggestionsClearRequested } = props;

    const autosuggestProps = {
      renderInputComponent,
      suggestions,
      onSuggestionsFetchRequested: debounce(onSuggestionsFetchRequested, 500),
      onSuggestionsClearRequested,
      onSuggestionSelected: onSuggestionSelected.bind(this, props),
      getSuggestionValue,
      renderSuggestion,
      focusInputOnSuggestionClick: false
    }

    return (
      <div className={classes.root}>
        <Autosuggest
          {...autosuggestProps}
          inputProps={{
            classes,
            placeholder: 'search repository...',
            value: value,
            onChange: onChange,
          }}
          theme={{
            container: classes.container,
            suggestionsContainerOpen: classes.suggestionsContainerOpen,
            suggestionsList: classes.suggestionsList,
            suggestion: classes.suggestion,
          }}
          renderSuggestionsContainer={options => (
            <Paper {...options.containerProps} square>
              {options.children}
            </Paper>
          )}
        />

        <div className={classes.loadingStatus}>
          {isLoading ? 'loading...' : null}
          <span className={classes.error}>{error ? error : null}</span>
        </div>
      </div>
    )
}

Search.propTypes = {
  classes: PropTypes.object.isRequired,
  value: PropTypes.string.isRequired,
  suggestions: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSuggestionsFetchRequested: PropTypes.func.isRequired,
  onSuggestionsClearRequested: PropTypes.func.isRequired,
  clearInput: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
}

const mapStateToProps = ({ search }) => {
  return { 
    value: search.value, 
    suggestions: search.suggestions, 
    isLoading: search.isLoading,
    error: search.error}
}

const mapDispatchToProps = (dispatch) => {
  return {
    onChange: (event, { newValue }) => dispatch(updateInputValue(newValue)),
    onSuggestionsFetchRequested: ({ value }) => dispatch(loadSuggestions(value)),
    onSuggestionsClearRequested: () => dispatch(clearSuggestions()),
    clearInput: () => dispatch(updateInputValue(''))
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
  withStyles(styles)
)(Search)