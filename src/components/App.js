import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'

import Home from '../pages/Home'
import SearchResults from '../pages/SearchResults'

const App = () => {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path={`/search*`} component={SearchResults} />
      <Redirect from='*' to='/' />
    </Switch>
  )
}

export default App