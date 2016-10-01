import React from 'react';
import ReactDom from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { connectToServer } from './actions/environmentActions';
import configureStore from './store';
import Root from './containers/Root.jsx';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/flag-icon-css/css/flag-icon.min.css';
import './styles/app.styl';


// init the Redux store
const store = configureStore();
store.dispatch(connectToServer());


ReactDom.render(
  <AppContainer>
    <Root store={store} />
  </AppContainer>,

  document.getElementById('app')
);

if (module.hot) {
  module.hot.accept('./containers/Root.jsx', () => {
    // eslint-disable-next-line global-require, react/require-extension
    const NewRoot = require('./containers/Root.jsx').default;

    ReactDom.render(
      <AppContainer>
        <NewRoot store={store} />
      </AppContainer>,

      document.getElementById('app')
    );
  });
}
