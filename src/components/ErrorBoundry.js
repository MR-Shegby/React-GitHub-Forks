import React, { Component } from 'react'
import ErrorIndicator from '../components/ErrorIndicator'
import PropTypes from 'prop-types'

class ErrorBoundry extends Component {
  state= {
    hasError: false
  }

  componentDidCatch(errorString, errorInfo) {
    this.setState({ hasError: true })
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorIndicator
          vertical="top" 
          open 
          message="Oops. Something went wrong. We're solving the problem..." 
        />
      )
    }

    return this.props.children
  }
}

ErrorBoundry.propTypes = {
  children: PropTypes.object.isRequired
}

export default ErrorBoundry