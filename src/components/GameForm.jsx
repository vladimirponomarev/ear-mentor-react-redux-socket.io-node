import React, { PropTypes } from 'react';
import MusicalIntervalSelector from './MusicalIntervalSelector.jsx';
import * as musicalIntervals from '../constants/musicalIntervals';
import * as musicalIntervalNames from '../constants/musicalIntervalNames';
import * as musicalIntervalDirections from '../constants/musicalIntervalDirections';


const GameForm = ({
  settings,
  onMusicalIntervalClick,
  incorrectAnswers
}) => {
  const hasAscDirection = settings.directions.includes(musicalIntervalDirections.ASC);
  const hasDescDirection = settings.directions.includes(musicalIntervalDirections.DESC);

  const ascMusicalIntervals = [];
  const descMusicalIntervals = [];
  const commonColumnClassNames = {
    'col-sm-12': true,
    'col-md-3': true,
    'col-lg-2': true
  };
  const commonButtonClassNames = {
    'btn': true, // eslint-disable-line quote-props
    'btn--bottom-offset': true,
    'btn--block': true,
    'btn--shadow': true,
    'btn--primary': true
  };

  Object.keys(musicalIntervals).forEach((key) => {
    const hasNotBeenChosen = !settings.intervals.includes(musicalIntervals[key]);
    const columnClassNames = Object.assign({}, commonColumnClassNames, {
      'hidden-xs': hasNotBeenChosen,
      'hidden-sm': hasNotBeenChosen
    });
    const musicalInterval = {
      name: musicalIntervalNames[key].short,
      columnClassNames
    };

    const value = musicalIntervals[key];
    const isIntervalInAscIncorrect = incorrectAnswers.includes(String(value));
    const isIntervalInDescIncorrect = incorrectAnswers.includes(String(-value));

    if (hasAscDirection) {
      ascMusicalIntervals.push(Object.assign({}, musicalInterval, {
        value,
        direction: musicalIntervalDirections.ASC,
        buttonClassNames: Object.assign({}, commonButtonClassNames, {
          'btn--error': isIntervalInAscIncorrect
        }),
        isDisabled: hasNotBeenChosen || isIntervalInAscIncorrect
      }));
    }

    if (hasDescDirection) {
      descMusicalIntervals.push(Object.assign({}, musicalInterval, {
        value: -value,
        direction: musicalIntervalDirections.DESC,
        buttonClassNames: Object.assign({}, commonButtonClassNames, {
          'btn--error': isIntervalInDescIncorrect
        }),
        isDisabled: hasNotBeenChosen || isIntervalInDescIncorrect
      }));
    }
  });


  const ascIntervalSelectionStyle = {
    display: hasAscDirection ? 'block' : 'none'
  };
  const descIntervalSelectionStyle = {
    display: hasDescDirection ? 'block' : 'none'
  };
  const separatorStyle = {
    display: hasDescDirection && hasDescDirection ? 'block' : 'none'
  };

  return (
    <div className="game">
      <fieldset className="module">
        <legend className="module__caption">Intervals</legend>

        <div className="module__content">

          <div style={ascIntervalSelectionStyle} className="row">
            <div className="hidden-xs hidden-sm col-md-1 text-center">
              <span className="direction-mark-character">A</span>
              <span className="direction-mark-character">S</span>
              <span className="direction-mark-character">C</span>
            </div>
            <div className="col-sm-12 col-md-11">
              <div className="row">
                {ascMusicalIntervals.map((interval, index) => (
                  <MusicalIntervalSelector
                    key={index}
                    onClick={onMusicalIntervalClick}
                    musicalInterval={interval}
                  />)
                )}
              </div>
            </div>
          </div>

          <div style={separatorStyle} className="interval-direction-separator"></div>

          <div style={descIntervalSelectionStyle} className="row">
            <div className="hidden-xs hidden-sm col-md-1 text-center">
              <span className="direction-mark-character">D</span>
              <span className="direction-mark-character">E</span>
              <span className="direction-mark-character">S</span>
              <span className="direction-mark-character">C</span>
            </div>
            <div className="col-sm-12 col-md-11">
              <div className="row">
                {descMusicalIntervals.map((interval, index) => (
                  <MusicalIntervalSelector
                    key={index}
                    onClick={onMusicalIntervalClick}
                    musicalInterval={interval}
                  />)
                )}
              </div>
            </div>
          </div>

        </div>
      </fieldset>
    </div>
  );
};

GameForm.propTypes = {
  settings: PropTypes.object.isRequired,
  onMusicalIntervalClick: PropTypes.func.isRequired,
  incorrectAnswers: PropTypes.array.isRequired
};

export default GameForm;

