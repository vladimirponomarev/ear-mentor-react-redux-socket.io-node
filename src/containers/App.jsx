import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Spinner from '../components/Spinner.jsx';
import LoaderScreen from '../components/LoaderScreen.jsx';
import AudioManager from '../utils/AudioManager';
import * as environmentActions from '../actions/environmentActions';


class App extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      isInRequest: true,
      isInAssetLoading: false,
      assetLoadingProgress: 0
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.isInRequest !== (nextProps.environment.requestInProgressCount > 0)) {
      this.setState({
        isInRequest: nextProps.environment.requestInProgressCount > 0
      });
    }

    if (!this.state.isInAssetLoading && nextProps.environment.isInAssetLoading) {
      this.setState({
        isInAssetLoading: nextProps.environment.isInAssetLoading
      });

      AudioManager.loadFiles(nextProps.environment.assets);
      this.listenAssetLoadingProgress();
    }
  }

  listenAssetLoadingProgress() {
    const timerId = setInterval(() => {
      const progress = AudioManager.getLoadingProgress();

      this.setState({
        assetLoadingProgress: progress
      });

      if (progress === 100) {
        clearInterval(timerId);

        this.setState({
          isInAssetLoading: false
        });

        this.props.environmentActions.completeAssetLoading();
      }
    }, 250);
  }


  render() {
    if (this.state.isInAssetLoading) {
      return (
        <LoaderScreen
          isVisible={this.state.isInAssetLoading}
          progress={this.state.assetLoadingProgress}
        />
      );
    }

    return (
      <div className="page">
        <div className="container">
          <div className="top-bar clearfix">
            <div className="logo">
              <Link to="/"><img alt="Ear Mentor" src="/img/logo.png" /></Link>
            </div>

            <nav className="main-nav">
              <ul>
                <li><Link to="/rating">Rating</Link></li>
                <li><Link to="/music-theory">Music Theory</Link></li>
                <li><Link to="/about">About</Link></li>
              </ul>
            </nav>
          </div>

          {this.props.children}
        </div>

        <footer className="footer">
          <div className="container clearfix">
            <div className="footer__copyright">
              <p>
                &copy; 2016 Created by <a href="http://vladimirponomarev.com">Vladimir Ponomarev</a>&nbsp;
                (<a href="https://twitter.com/vldmrponomarev">@vldmrponomarev</a>).&nbsp;
                The application licenced under MIT Licence.
              </p>
            </div>

            <div className="footer__nav">
              <ul>
                <li><a href="https://github.com/vladimirponomarev/ear-mentor-react-redux-socket.io-node">Source code</a></li>
              </ul>
            </div>
          </div>
        </footer>

        <Spinner isVisible={this.state.isInRequest} />
      </div>
    );
  }

}

App.propTypes = {
  children: PropTypes.object.isRequired,
  environmentActions: PropTypes.object.isRequired
};

App.contextTypes = {
  router: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    environment: state.environment
  };
}

function mapDispatchToProps(dispatch) {
  return {
    environmentActions: bindActionCreators(environmentActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
