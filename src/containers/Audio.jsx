import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AudioWidget from '../components/AudioWidget.jsx';
import AudioManager from '../utils/AudioManager';
import * as settingsActions from '../actions/settingsActions';
import * as musicalTempoLimits from '../constants/musicalTempoLimits';


class Audio extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      hoveredVolume: 0,
      settings: Object.assign({}, props.settings)
    };

    this.changeVolume = this.changeVolume.bind(this);
    this.changeTempo = this.changeTempo.bind(this);
    this.changeHoveredVolume = this.changeHoveredVolume.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      settings: Object.assign({}, nextProps.settings)
    });
  }

  changeVolume(event) {
    event.preventDefault();

    const volume = parseFloat(event.target.value);

    AudioManager.setVolume(volume);
    this.props.settingsActions.setVolume(volume);
  }

  changeTempo(event) {
    const tempo = parseInt(event.target.value, 10);

    if (isNaN(tempo) || tempo < musicalTempoLimits.MIN || tempo > musicalTempoLimits.MAX) {
      return;
    }

    this.props.settingsActions.setTempo(tempo);
  }

  changeHoveredVolume(event) {
    let hoveredVolume = 0;
    if (event.type === 'mouseover') {
      hoveredVolume = parseFloat(event.target.value);
    }

    return this.setState({
      hoveredVolume
    });
  }

  render() {
    return (
      <AudioWidget
        volume={this.state.settings.volume}
        tempo={this.state.settings.tempo}
        hoveredVolume={this.state.hoveredVolume}
        onClickRepeat={this.props.onClickRepeat}
        onChangeTempo={this.changeTempo}
        onMouseOverVolume={this.changeHoveredVolume}
        onMouseOutVolume={this.changeHoveredVolume}
        onClickVolume={this.changeVolume}
      />
    );
  }

}


Audio.propTypes = {
  settings: PropTypes.object.isRequired,
  settingsActions: PropTypes.object.isRequired,
  onClickRepeat: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    settings: state.settings
  };
}

function mapDispatchToProps(dispatch) {
  return {
    settingsActions: bindActionCreators(settingsActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Audio);
