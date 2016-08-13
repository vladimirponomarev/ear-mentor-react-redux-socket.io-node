import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import GameForm from '../components/GameForm.jsx';
import * as gameActions from '../actions/gameActions';
import * as answerTypes from '../constants/answerTypes';


class Game extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      environment: Object.assign({}, props.environment),
      settings: Object.assign({}, props.settings),
      game: Object.assign({}, props.game)
    };

    this.question = {
      number: 0
    };

    this.selectInterval = this.selectInterval.bind(this);
    this.repeatQuestion = this.repeatQuestion.bind(this);
  }

  componentDidMount() {
    if (this.state.environment.isInGame) {
      this.props.gameActions.requestQuestion();
    }
  }


  componentWillReceiveProps(nextProps) {
    if (this.question.number < nextProps.game.question.number) {
      this.question = Object.assign({}, nextProps.game.question);
    }
  }

  playQuestion() {
  }

  repeatQuestion(event) {
    event.preventDefault();
  }

  selectInterval(event) {
    event.preventDefault();
  }

  render() {
    return (
      <div className="row">
        <div className="col-xs-12 col-lg-8">
          <GameForm settings={this.state.settings} onMusicalIntervalClick={this.selectInterval} />
        </div>
      </div>
    );
  }

}

Game.propTypes = {
  environment: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
  game: PropTypes.object.isRequired,
  gameActions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    environment: state.environment,
    settings: state.settings,
    game: state.game
  };
}

function mapDispatchToProps(dispatch) {
  return {
    gameActions: bindActionCreators(gameActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);
