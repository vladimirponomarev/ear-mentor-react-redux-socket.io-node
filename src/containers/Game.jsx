import React, { PropTypes } from 'react';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import GameForm from '../components/GameForm';
import CurrentPlayers from './CurrentPlayers';
import Audio from './Audio';
import AudioManager from '../utils/AudioManager';
import GameOverModal from '../components/GameOverModal';
import AssetLoader from '../containers/AssetLoader';
import * as gameActions from '../actions/gameActions';
import * as environmentActions from '../actions/environmentActions';


class Game extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      settings: Object.assign({}, props.settings),
      environment: Object.assign({}, props.environment),
      game: Object.assign({}, props.game)
    };

    this.repeatQuestion = this.repeatQuestion.bind(this);
    this.selectInterval = this.selectInterval.bind(this);
    this.replay = this.replay.bind(this);
  }

  componentDidMount() {
    this.props.router.setRouteLeaveHook(this.props.route, this.routerWillLeave.bind(this));
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.environment.isInGame !== nextProps.environment.isInGame) {
      this.setState({
        environment: Object.assign({}, nextProps.environment)
      });
    }

    if (this.state.environment.hasPlayerLost !== nextProps.environment.hasPlayerLost) {
      this.setState({
        environment: Object.assign({}, nextProps.environment)
      });
    }

    if (!this.state.environment.isInGame && nextProps.environment.isInGame) {
      this.props.gameActions.requestQuestion();
    }

    if (this.state.game.question.number !== nextProps.game.question.number) {
      this.setState({
        game: Object.assign({}, nextProps.game)
      });
    }

    if (this.state.game.incorrectAnswers.length !== nextProps.game.incorrectAnswers.length) {
      this.setState({
        game: Object.assign({}, nextProps.game)
      });
    }

    if (this.state.settings.tempo !== nextProps.settings.tempo) {
      this.setState({
        settings: Object.assign({}, nextProps.settings)
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const prevQuestionNumber = prevState.game.question.number;
    const currentQuestionNumber = this.state.game.question.number;

    if (prevQuestionNumber !== currentQuestionNumber && currentQuestionNumber !== 0) {
      this.playQuestion();
    }
  }

  // eslint-disable-next-line
  routerWillLeave() {
    if (!this.state.game.hasPlayerLost) {
      return 'Finish the Game?';
    }
  }

  playQuestion() {
    const tempo = this.state.settings.tempo;
    const timeoutValue = (60 * 1000) / tempo;
    const question = this.state.game.question;

    if (this.timerId) {
      clearTimeout(this.timerId);
      AudioManager.pauseAll();
    }

    AudioManager.play(question.firstNote);

    this.timerId = setTimeout(() => {
      AudioManager.pause(question.firstNote);
      AudioManager.play(question.secondNote);

      // give for the second note little more time, so timeout * 2
      this.timerId = setTimeout(() => {
        AudioManager.pause(question.secondNote);
      }, timeoutValue * 2);
    }, timeoutValue);
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
    if (!this.state.environment.isInGame && !this.state.environment.hasPlayerLost) {
      return (<AssetLoader />);
    }

    return (
      <div className="content">
        <div className="content__head" />

        <div className="content__body container">

          <div className="row">
            <div className="col-sm-12">
              <p className="game-task">
                Select the interval between the notes you've just listened.
              </p>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-12 col-md-7 col-lg-8">
              <GameForm
                settings={this.state.settings}
                onClickMusicalInterval={this.selectInterval}
                incorrectAnswers={this.state.game.incorrectAnswers}
              />
            </div>
            <div className="col-sm-12 col-md-5 col-lg-4">
              <Audio onClickRepeat={this.repeatQuestion} />

              <CurrentPlayers />
            </div>

            <GameOverModal
              isVisible={this.state.environment.hasPlayerLost}
              score={this.state.game.score}
              onClickReplay={this.replay}
            />
          </div>
        </div>

      </div>
    );
  }

}

Game.propTypes = {
  route: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired,
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Game));
