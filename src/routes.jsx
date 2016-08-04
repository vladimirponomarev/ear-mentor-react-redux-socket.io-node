import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App.jsx';
import Index from './containers/Index.jsx';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Index} />
  </Route>
);

