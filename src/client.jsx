import React from 'react';
import ReactDom from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { connectToServer } from './actions/environmentActions';
import configureStore from './store/configureStore';
import routes from './routes.jsx';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/flag-icon-css/css/flag-icon.min.css';
import './styles/app.styl';

const store = configureStore();
store.dispatch(connectToServer());


ReactDom.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,

  document.getElementById('app')
);
