import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Base from './components/Base.jsx';
import Index from './components/Index.jsx';
import Game from './containers/Game.jsx';
import Rating from './containers/Rating.jsx';
import NotFoundPage from './components/NotFoundPage.jsx';
import * as environmentActions from './actions/environmentActions';

export default (store) => {
  function quitGame() {
    store.dispatch(environmentActions.quitGame());

    return true;
  }

  return (
    <Route path="/" component={Base}>
      <IndexRoute component={Index} />
      <Route path="game" component={Game} onLeave={quitGame} />
      <Route path="rating" component={Rating} />
      <Route path="*" component={NotFoundPage} />
    </Route>
  );
};
