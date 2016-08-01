import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SettingsForm from '../components/SettingsForm';
import calculateScorePoints from '../utils/calculateScorePoints';
import { getCountryByCode, getCountryByName } from '../utils/country';
import * as settingsActions from '../actions/settingsActions';
import * as environmentActions from '../actions/environmentActions';
import * as musicalIntervals from '../constants/musicalIntervals';
import * as musicalInstruments from '../constants/musicalInstruments';


class SettingsContainer extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      errors: {},
      settings: Object.assign({}, props.settings),
      environment: Object.assign({}, props.environment),
      pointsPerAnswer: calculateScorePoints(props.settings),
      countryFullName: ''
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
        pointsPerAnswer: calculateScorePoints(nextProps.settings)
      });
    }

    if (this.state.settings.directions.length !== nextProps.settings.directions.length) {
      this.setState({
        pointsPerAnswer: calculateScorePoints(nextProps.settings)
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
    const countryData = getCountryByName(countryFullName);

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
    return this.props.settingsActions.selectInstrument(event.target.value);
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

  isFormValid() {
    let isValid = true;
    let directionCount = 0;
    let intervalCount = 0;

    const errors = {};
    const settings = this.state.settings;
    const isInstrumentValid = Object.keys(musicalInstruments)
      .some(key => musicalInstruments[key] === settings.instrument);


    directionCount += settings.directions.includes(musicalIntervals.DIRECTION_ASC) ? 1 : 0;
    directionCount += settings.directions.includes(musicalIntervals.DIRECTION_DESC) ? 1 : 0;
    intervalCount += settings.intervals.includes(musicalIntervals.MINOR_SECOND) ? 1 : 0;
    intervalCount += settings.intervals.includes(musicalIntervals.MAJOR_SECOND) ? 1 : 0;
    intervalCount += settings.intervals.includes(musicalIntervals.MINOR_THIRD) ? 1 : 0;
    intervalCount += settings.intervals.includes(musicalIntervals.MAJOR_THIRD) ? 1 : 0;
    intervalCount += settings.intervals.includes(musicalIntervals.PERFECT_FOURTH) ? 1 : 0;
    intervalCount += settings.intervals.includes(musicalIntervals.TRITONE) ? 1 : 0;
    intervalCount += settings.intervals.includes(musicalIntervals.PERFECT_FIFTH) ? 1 : 0;
    intervalCount += settings.intervals.includes(musicalIntervals.MINOR_SIXTH) ? 1 : 0;
    intervalCount += settings.intervals.includes(musicalIntervals.MAJOR_SIXTH) ? 1 : 0;
    intervalCount += settings.intervals.includes(musicalIntervals.MINOR_SEVENTH) ? 1 : 0;
    intervalCount += settings.intervals.includes(musicalIntervals.MAJOR_SEVENTH) ? 1 : 0;
    intervalCount += settings.intervals.includes(musicalIntervals.PERFECT_OCTAVE) ? 1 : 0;


    if (!isInstrumentValid) {
      errors.instrument = 'Please choose an available instrument.';
      isValid = false;
    }

    if (directionCount === 0) {
      errors.directions = 'Please choose at least one interval direction.';
      isValid = false;
    }

    if (intervalCount === 1 && directionCount === 1) {
      errors.intervals = 'Please choose at least two intervals ' +
        'or consider to add another direction.';
      isValid = false;
    } else if (intervalCount === 0) {
      errors.intervals = 'Please choose at least two intervals.';
      isValid = false;
    }

    if (settings.name.trim().length === 0) {
      errors.name = 'Please provide your name.';
      isValid = false;
    }

    if (settings.country.trim().length === 0) {
      errors.country = 'Please provide your country.';
      isValid = false;
    }

    return {
      isValid,
      errors
    };
  }

  startGame(event) {
    event.preventDefault();

    const validationResult = this.isFormValid();
    if (!validationResult.isValid) {
      return this.setState({
        errors: validationResult.errors
      });
    }

    this.setState({
      errors: {}
    });

    return this.props.environmentActions.startGame(this.state.settings);
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


SettingsContainer.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(SettingsContainer);
