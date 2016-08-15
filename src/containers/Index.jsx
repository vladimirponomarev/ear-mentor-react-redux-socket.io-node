import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Welcome from '../components/Welcome.jsx';
import Game from '../containers/Game.jsx';


class Index extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isInGame: props.environment.isInGame
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.isInGame !== nextProps.environment.isInGame) {
      this.setState({
        isInGame: nextProps.environment.isInGame
      });
    }
  }

  render() {
    if (this.state.isInGame) {
      return (<Game />);
    }

    return (<Welcome />);
  }

}


function mapStateToProps(state) {
  return {
    environment: state.environment
  };
}

Index.propTypes = {
  environment: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(Index);
