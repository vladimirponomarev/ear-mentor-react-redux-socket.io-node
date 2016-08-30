import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import GameForm from '../components/GameForm.jsx';
import CurrentPlayers from './CurrentPlayers.jsx';
import AudioWidget from '../components/AudioWidget.jsx';
import AudioManager from '../utils/AudioManager';
import GameOverModal from '../components/GameOverModal.jsx';
import * as gameActions from '../actions/gameActions';
import * as environmentActions from '../actions/environmentActions';


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
    this.replay = this.replay.bind(this);
  }

  componentDidMount() {
    if (this.state.environment.isInGame) {
      this.props.gameActions.requestQuestion();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.question.number < nextProps.game.question.number) {
      this.question = Object.assign({}, nextProps.game.question);

      this.playQuestion();
    }

    if (this.state.game.incorrectAnswers.length !== nextProps.game.incorrectAnswers.length) {
      this.setState({
        game: nextProps.game
      });
    }

    if (nextProps.game.hasPlayerLost) {
      this.setState({
        game: nextProps.game
      });
    }
  }

  playQuestion() {
    const tempo = 80;
    const timeoutValue = (60 * 1000) / tempo;
    const question = this.question;
    let hasFirstNotePlayed = false;
    let hasSecondNotePlayed = false;

    AudioManager.pauseAll();

    // set a little delay of 30 ms to complete pausing of all audio files
    let questionPlayerTimerId = setTimeout(function play() {
      if (!hasFirstNotePlayed) {
        AudioManager.play(question.firstNote);

        hasFirstNotePlayed = true;
        questionPlayerTimerId = setTimeout(play, timeoutValue);
      } else if (!hasSecondNotePlayed) {
        AudioManager.pause(question.firstNote);
        AudioManager.play(question.secondNote);

        hasSecondNotePlayed = true;
        questionPlayerTimerId = setTimeout(play, timeoutValue * 3);
      } else {
        AudioManager.pause(question.secondNote);
        clearTimeout(questionPlayerTimerId);
      }
    }, 30);
  }

  selectInterval(event) {
    event.preventDefault();

    this.props.gameActions.sendAnswer(event.target.value);
  }

  repeatQuestion(event) {
    event.preventDefault();

    this.playQuestion();
  }

  replay(event) {
    event.preventDefault();

    this.props.environmentActions.startGame(this.state.settings);
  }

  render() {
    return (
      <div className="game">

        <div className="game__top" />

        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <p className="game__task">Select the interval between the notes you've just listened.</p>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-12 col-md-7 col-lg-8">
              <GameForm
                settings={this.state.settings}
                onMusicalIntervalClick={this.selectInterval}
                incorrectAnswers={this.state.game.incorrectAnswers}
              />
            </div>
            <div className="col-sm-12 col-md-5 col-lg-4">
              <CurrentPlayers />

              <AudioWidget onRepeatButtonClick={this.repeatQuestion} />
            </div>

            <GameOverModal
              isVisible={this.state.game.hasPlayerLost}
              score={this.state.game.score}
              onReplayButtonClick={this.replay}
            />
          </div>
        </div>
      </div>
    );
  }

}

Game.propTypes = {
  environment: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
  game: PropTypes.object.isRequired,
  gameActions: PropTypes.object.isRequired,
  environmentActions: PropTypes.object.isRequired
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
    gameActions: bindActionCreators(gameActions, dispatch),
    environmentActions: bindActionCreators(environmentActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);
