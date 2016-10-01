import React, { PropTypes } from 'react';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import getRoutes from '../routes.jsx';


// eslint-disable-next-line react/prefer-stateless-function
class Root extends React.Component {

  render() {
    return (
      <Provider store={this.props.store}>
        <Router history={browserHistory} routes={getRoutes(this.props.store)} />
      </Provider>
    );
  }

}

Root.propTypes = {
  store: PropTypes.object.isRequired
};

export default Root;
