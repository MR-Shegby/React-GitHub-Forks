import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'

import './index.css';
import store from './store'
import ErrorBoundry from './components/ErrorBoundry'
import App from './components/App';

const app = (
  <Provider store={store}>
    <ErrorBoundry>
      <Router>
        <App />
      </Router>
    </ErrorBoundry>
  </Provider>
)

ReactDOM.render(app, document.getElementById('root'));