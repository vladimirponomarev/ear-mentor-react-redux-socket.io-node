import React from 'react';
import classNames from 'classnames';
import Autocomplete from 'react-autocomplete';
import { getCountryList } from '../utils/country';
import * as musicalInstruments from '../constants/musicalInstruments';
import * as musicalIntervals from '../constants/musicalIntervals';
import * as musicalIntervalDirections from '../constants/musicalIntervalDirections';


const SettingsForm = ({
  errors,
  settings,
  pointsPerAnswer,
  countryFullName,
  onChangeMusicalInterval,
  onChangeMusicalIntervalDirection,
  onChangeName,
  onChangeCountry,
  onSelectInstrument,
  onStartGame,
  onClickAllIntervals,
  onClickRandomizeIntervals,
  onAutocompleteCountry
}) => {
  const btnInstrumentBassClass = classNames({
    btn: true,
    'btn-setting': true,
    'btn-setting--active': settings.instrument === musicalInstruments.BASS
  });
  const btnInstrumentGuitarClass = classNames({
    btn: true,
    'btn-setting': true,
    'btn-setting--active': settings.instrument === musicalInstruments.GUITAR
  });
  const btnInstrumentPianoClass = classNames({
    btn: true,
    'btn-setting': true,
    'btn-setting--active': settings.instrument === musicalInstruments.PIANO
  });

  const legendInstrumentClassName = classNames({
    form__legend: true,
    'form__legend--error': errors.instrument
  });

  const legendIntervalsClassName = classNames({
    form__legend: true,
    'form__legend--error': errors.intervals
  });

  const legendDirectionsClassName = classNames({
    form__legend: true,
    'form__legend--error': errors.directions
  });

  const legendPlayerClassName = classNames({
    form__legend: true,
    'form__legend--error': errors.playerName || errors.country
  });

  const inputGroupPlayerNameClassName = classNames({
    'form__input-group': true,
    'form__input-group--error': errors.name
  });

  const inputGroupPlayerCountryClassName = classNames({
    'form__input-group': true,
    'form__input-group--error': errors.country
  });

  const pointsPerAnswerClassName = classNames({
    'points-per-answer-value': true,
    'points-per-answer-value--error': pointsPerAnswer === 0
  });

  const pointUnit = pointsPerAnswer === 1 ? 'point' : 'points';

  const autocompleteWrapperStyle = {
    display: 'block'
  };
  const menuStyle = {
    background: '#fff',
    boxShadow: '1px 5px 10px #999',
    border: '1px solid #ccc',
    position: 'fixed',
    margin: '-1px 0 0 0',
    zIndex: 2
  };


  return (
    <form className="form settings-form" onSubmit={onStartGame}>
      <fieldset className="form__fieldset">
        <legend className={legendInstrumentClassName}>Instrument</legend>

        <div className="row">
          <div className="col-sm-12 col-md-4 col-lg-3">
            <button
              type="button"
              onClick={onSelectInstrument}
              value={musicalInstruments.BASS}
              className={btnInstrumentBassClass}
            >
              Bass
            </button>
          </div>
          <div className="col-sm-12 col-md-4 col-lg-3">
            <button
              type="button"
              onClick={onSelectInstrument}
              value={musicalInstruments.GUITAR}
              className={btnInstrumentGuitarClass}
            >
              Guitar
            </button>
          </div>
          <div className="col-sm-12 col-md-4 col-lg-3">
            <button
              type="button"
              onClick={onSelectInstrument}
              value={musicalInstruments.PIANO}
              className={btnInstrumentPianoClass}
            >
              Piano
            </button>
          </div>
        </div>
      </fieldset>

      <fieldset className="form__fieldset">
        <legend className={legendIntervalsClassName}>
          Intervals to Practice&nbsp;
          <span className="interval-control">
            (<button onClick={onClickAllIntervals}>All</button>
            &nbsp;/&nbsp;
            <button onClick={onClickRandomizeIntervals}>Randomize</button>)
          </span>
        </legend>

        <div className="row interval-selection">
          <div className="col-sm-12 col-lg-6">
            <label className="checkbox-control" htmlFor="minor-second-checkbox">
              <input
                id="minor-second-checkbox"
                value={musicalIntervals.MINOR_SECOND}
                onChange={onChangeMusicalInterval}
                checked={settings.intervals.includes(musicalIntervals.MINOR_SECOND)}
                type="checkbox"
              />
              <span>Minor Second (m2)</span>
            </label>
          </div>

          <div className="col-sm-12 col-lg-6">
            <label className="checkbox-control" htmlFor="major-second-checkbox">
              <input
                id="major-second-checkbox"
                value={musicalIntervals.MAJOR_SECOND}
                onChange={onChangeMusicalInterval}
                checked={settings.intervals.includes(musicalIntervals.MAJOR_SECOND)}
                type="checkbox"
              />
              <span>Major Second (M2)</span>
            </label>
          </div>

          <div className="col-sm-12 col-lg-6">
            <label className="checkbox-control" htmlFor="minor-third-checkbox">
              <input
                id="minor-third-checkbox"
                value={musicalIntervals.MINOR_THIRD}
                onChange={onChangeMusicalInterval}
                checked={settings.intervals.includes(musicalIntervals.MINOR_THIRD)}
                type="checkbox"
              />
              <span>Minor Third (m3)</span>
            </label>
          </div>

          <div className="col-sm-12 col-lg-6">
            <label className="checkbox-control" htmlFor="major-third-checkbox">
              <input
                id="major-third-checkbox"
                value={musicalIntervals.MAJOR_THIRD}
                onChange={onChangeMusicalInterval}
                checked={settings.intervals.includes(musicalIntervals.MAJOR_THIRD)}
                type="checkbox"
              />
              <span>Major Third (M3)</span>
            </label>
          </div>

          <div className="col-sm-12 col-lg-6">
            <label className="checkbox-control" htmlFor="perfect-fourth-checkbox">
              <input
                id="perfect-fourth-checkbox"
                value={musicalIntervals.PERFECT_FOURTH}
                onChange={onChangeMusicalInterval}
                checked={settings.intervals.includes(musicalIntervals.PERFECT_FOURTH)}
                type="checkbox"
              />
              <span>Perfect Fourth (F4)</span>
            </label>
          </div>

          <div className="col-sm-12 col-lg-6">
            <label className="checkbox-control" htmlFor="tritone-checkbox">
              <input
                id="tritone-checkbox"
                value={musicalIntervals.TRITONE}
                onChange={onChangeMusicalInterval}
                checked={settings.intervals.includes(musicalIntervals.TRITONE)}
                type="checkbox"
              />
              <span>Tritone</span>
            </label>
          </div>

          <div className="col-sm-12 col-lg-6">
            <label className="checkbox-control" htmlFor="perfect-fifth-checkbox">
              <input
                id="perfect-fifth-checkbox"
                value={musicalIntervals.PERFECT_FIFTH}
                onChange={onChangeMusicalInterval}
                checked={settings.intervals.includes(musicalIntervals.PERFECT_FIFTH)}
                type="checkbox"
              />
              <span>Perfect Fifth (F5)</span>
            </label>
          </div>

          <div className="col-sm-12 col-lg-6">
            <label className="checkbox-control" htmlFor="minor-sixth-checkbox">
              <input
                id="minor-sixth-checkbox"
                value={musicalIntervals.MINOR_SIXTH}
                onChange={onChangeMusicalInterval}
                checked={settings.intervals.includes(musicalIntervals.MINOR_SIXTH)}
                type="checkbox"
              />
              <span>Minor Sixth (m6)</span>
            </label>
          </div>

          <div className="col-sm-12 col-lg-6">
            <label className="checkbox-control" htmlFor="major-sixth-checkbox">
              <input
                id="major-sixth-checkbox"
                value={musicalIntervals.MAJOR_SIXTH}
                onChange={onChangeMusicalInterval}
                checked={settings.intervals.includes(musicalIntervals.MAJOR_SIXTH)}
                type="checkbox"
              />
              <span>Major Sixth (M6)</span>
            </label>
          </div>

          <div className="col-sm-12 col-lg-6">
            <label className="checkbox-control" htmlFor="minor-seventh-checkbox">
              <input
                id="minor-seventh-checkbox"
                value={musicalIntervals.MINOR_SEVENTH}
                onChange={onChangeMusicalInterval}
                checked={settings.intervals.includes(musicalIntervals.MINOR_SEVENTH)}
                type="checkbox"
              />
              <span>Minor Seventh (m7)</span>
            </label>
          </div>

          <div className="col-sm-12 col-lg-6">
            <label className="checkbox-control" htmlFor="major-seventh-checkbox">
              <input
                id="major-seventh-checkbox"
                value={musicalIntervals.MAJOR_SEVENTH}
                onChange={onChangeMusicalInterval}
                checked={settings.intervals.includes(musicalIntervals.MAJOR_SEVENTH)}
                type="checkbox"
              />
              <span>Major Seventh (M7)</span>
            </label>
          </div>

          <div className="col-sm-12 col-lg-6">
            <label className="checkbox-control" htmlFor="perfect-octave-checkbox">
              <input
                id="perfect-octave-checkbox"
                value={musicalIntervals.PERFECT_OCTAVE}
                onChange={onChangeMusicalInterval}
                checked={settings.intervals.includes(musicalIntervals.PERFECT_OCTAVE)}
                type="checkbox"
              />
              <span>Octave (P8)</span>
            </label>
          </div>
        </div>
      </fieldset>

      <fieldset className="form__fieldset">
        <legend className={legendDirectionsClassName}>Direction</legend>

        <div className="row direction-selection">
          <div className="col-sm-12 col-md-6">
            <label className="checkbox-control" htmlFor="direction-asc-checkbox">
              <input
                id="direction-asc-checkbox"
                value={musicalIntervalDirections.ASC}
                onChange={onChangeMusicalIntervalDirection}
                checked={settings.directions.includes(musicalIntervalDirections.ASC)}
                type="checkbox"
              />
              <span>Ascending</span>
            </label>
          </div>

          <div className="col-sm-12 col-md-6">
            <label className="checkbox-control" htmlFor="direction-desc-checkbox">
              <input
                id="direction-desc-checkbox"
                value={musicalIntervalDirections.DESC}
                onChange={onChangeMusicalIntervalDirection}
                checked={settings.directions.includes(musicalIntervalDirections.DESC)}
                type="checkbox"
              />
              <span>Descending</span>
            </label>
          </div>
        </div>
      </fieldset>

      <fieldset className="form__fieldset">
        <legend className="form__legend">Points per Answer</legend>

        <p className={pointsPerAnswerClassName}>{pointsPerAnswer} {pointUnit}</p>
      </fieldset>


      <fieldset className="form__fieldset">
        <legend className={legendPlayerClassName}>Player</legend>

        <div className={inputGroupPlayerNameClassName}>
          <input
            className="form-control"
            type="text"
            id="name"
            placeholder="Name"
            name="name"
            value={settings.name}
            onChange={onChangeName}
          />
        </div>

        <div className={inputGroupPlayerCountryClassName}>
          <Autocomplete
            menuStyle={menuStyle}
            inputProps={{
              placeholder: 'Country',
              className: 'form-control'
            }}
            items={getCountryList()}
            getItemValue={(item) => item.name}
            shouldItemRender={(item, val) => val.length >= 2 &&
              (item.name.toLowerCase().indexOf(val.toLowerCase()) !== -1 ||
               item.code.toLowerCase().indexOf(val.toLowerCase()) !== -1)
            }
            renderItem={(item, isHighlighted) => (
              <div
                className={isHighlighted ?
                  'autocomplete__item autocomplete__item--highlighted' :
                  'autocomplete__item'}
                key={item.code}
              >
              {item.name}
              </div>
            )}
            onChange={onChangeCountry}
            value={countryFullName}
            wrapperStyle={autocompleteWrapperStyle}
            onSelect={onAutocompleteCountry}
          />
        </div>

        <div className="row">
          <div className="col-sm-12 col-md-6">
            <button
              className="btn btn--primary btn--block btn--shadow btn--lg"
              type="submit"
            >
              Start
            </button>
          </div>
        </div>
      </fieldset>

      <div className="settings-form__error">
      {Object.keys(errors)
             .map((prop, i) => (<p key={i} className="error-message">{errors[prop]}</p>))}
      </div>
    </form>
  );
};


SettingsForm.propTypes = {
  errors: React.PropTypes.object.isRequired,
  settings: React.PropTypes.object.isRequired,
  pointsPerAnswer: React.PropTypes.number.isRequired,
  countryFullName: React.PropTypes.string.isRequired,
  onStartGame: React.PropTypes.func.isRequired,
  onChangeMusicalInterval: React.PropTypes.func.isRequired,
  onChangeMusicalIntervalDirection: React.PropTypes.func.isRequired,
  onChangeName: React.PropTypes.func.isRequired,
  onChangeCountry: React.PropTypes.func.isRequired,
  onSelectInstrument: React.PropTypes.func.isRequired,
  onClickAllIntervals: React.PropTypes.func.isRequired,
  onClickRandomizeIntervals: React.PropTypes.func.isRequired,
  onAutocompleteCountry: React.PropTypes.func.isRequired
};

export default SettingsForm;
