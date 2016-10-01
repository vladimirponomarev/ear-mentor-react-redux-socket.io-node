import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AudioManager from '../utils/AudioManager';
import LoaderScreen from '../components/LoaderScreen.jsx';
import * as environmentActions from '../actions/environmentActions';

class AssetLoader extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      progress: 0,
      environment: Object.assign({}, props.environment)
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.environment.isInAssetLoading !== nextProps.environment.isInAssetLoading) {
      this.setState({
        environment: nextProps.environment
      });

      this.loadAssets(nextProps.environment.assets);
    }
  }

  loadAssets(assets) {
    AudioManager.loadFiles(assets);

    this.listenLoadingProgress();
  }

  listenLoadingProgress() {
    const timerId = setInterval(() => {
      const progress = AudioManager.getLoadingProgress();
      if (progress >= 100) {
        clearInterval(timerId);

        return this.props.environmentActions.completeAssetLoading();
      }

      return this.setState({
        progress
      });
    }, 250);
  }

  render() {
    return (
      <LoaderScreen isVisible progress={this.state.progress} />
    );
  }

}

AssetLoader.propTypes = {
  environment: PropTypes.object.isRequired,
  environmentActions: PropTypes.object.isRequired
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

export default connect(mapStateToProps, mapDispatchToProps)(AssetLoader);
