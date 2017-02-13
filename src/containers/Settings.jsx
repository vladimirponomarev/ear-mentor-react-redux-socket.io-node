import React, { PropTypes } from 'react';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SettingsForm from '../components/SettingsForm';
import Country from '../utils/Country';
import ScorePointCalculator from '../utils/ScorePointCalculator';
import Validator from '../utils/Validator';
import * as settingsActions from '../actions/settingsActions';
import * as environmentActions from '../actions/environmentActions';


class Settings extends React.Component {

  constructor(props) {
    super(props);

    let countryFullName = '';
    if (props.settings.country) {
      const countryData = Country.getByCode(props.settings.country);

      countryFullName = countryData ? countryData.name : '';
    }

    this.state = {
      errors: {},
      settings: Object.assign({}, props.settings),
      environment: Object.assign({}, props.environment),
      pointsPerAnswer: ScorePointCalculator.calculate(props.settings),
      countryFullName
    };

    this.selectInstrument = this.selectInstrument.bind(this);
    this.toggleMusicalInterval = this.toggleMusicalInterval.bind(this);
    this.toggleMusicalIntervalDirection = this.toggleMusicalIntervalDirection.bind(this);
    this.startGame = this.startGame.bind(this);
    this.changeName = this.changeName.bind(this);
    this.changeCountry = this.changeCountry.bind(this);
    this.autocompleteCountry = this.autocompleteCountry.bind(this);
    this.selectAllIntervals = this.selectAllIntervals.bind(this);
    this.randomizeIntervals = this.randomizeIntervals.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.settings.intervals.length !== nextProps.settings.intervals.length) {
      this.setState({
        pointsPerAnswer: ScorePointCalculator.calculate(nextProps.settings)
      });
    }

    if (this.state.settings.directions.length !== nextProps.settings.directions.length) {
      this.setState({
        pointsPerAnswer: ScorePointCalculator.calculate(nextProps.settings)
      });
    }

    this.setState({
      settings: Object.assign({}, nextProps.settings),
      environment: Object.assign({}, nextProps.environment)
    });
  }

  changeName(event) {
    return this.props.settingsActions.changeName(event.target.value);
  }

  changeCountry(event) {
    const countryFullName = event.target.value;
    const countryData = Country.getByName(countryFullName);

    if (countryData) {
      this.props.settingsActions.changeCountry(countryData.code);
    }

    return this.setState({ countryFullName });
  }

  autocompleteCountry(value, item) {
    this.setState({
      countryFullName: value
    });

    return this.props.settingsActions.changeCountry(item.code);
  }

  selectInstrument(event) {
    return this.props.settingsActions.setInstrument(event.target.value);
  }

  toggleMusicalInterval(event) {
    return this.props.settingsActions.toggleMusicalInterval(parseInt(event.target.value, 10));
  }

  toggleMusicalIntervalDirection(event) {
    return this.props.settingsActions.toggleMusicalIntervalDirection(event.target.value);
  }

  selectAllIntervals(event) {
    event.preventDefault();

    return this.props.settingsActions.selectAllIntervals();
  }

  randomizeIntervals(event) {
    event.preventDefault();

    return this.props.settingsActions.randomizeIntervals();
  }

  validate() {
    return Validator.isSettingsDataValid(this.state.settings);
  }

  startGame(event) {
    event.preventDefault();

    const validationResult = this.validate();

    if (!validationResult.isValid) {
      return this.setState({
        errors: validationResult.errors
      });
    }

    this.setState({
      errors: {}
    });
    this.props.environmentActions.startGame(this.state.settings);

    return this.props.router.push('/game');
  }

  render() {
    return (
      <SettingsForm
        errors={this.state.errors}
        settings={this.state.settings}
        pointsPerAnswer={this.state.pointsPerAnswer}
        countryFullName={this.state.countryFullName}
        onStartGame={this.startGame}
        onChangeName={this.changeName}
        onChangeCountry={this.changeCountry}
        onChangeMusicalInterval={this.toggleMusicalInterval}
        onChangeMusicalIntervalDirection={this.toggleMusicalIntervalDirection}
        onSelectInstrument={this.selectInstrument}
        onClickAllIntervals={this.selectAllIntervals}
        onClickRandomizeIntervals={this.randomizeIntervals}
        onAutocompleteCountry={this.autocompleteCountry}
      />
    );
  }

}


Settings.propTypes = {
  router: PropTypes.object.isRequired,
  environment: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
  settingsActions: PropTypes.object.isRequired,
  environmentActions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    environment: state.environment,
    settings: state.settings
  };
}

function mapDispatchToProps(dispatch) {
  return {
    settingsActions: bindActionCreators(settingsActions, dispatch),
    environmentActions: bindActionCreators(environmentActions, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Settings));
