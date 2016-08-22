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
    'btn-block': true,
    'btn-shadow': true,
    'btn-primary': true
  };

  Object.keys(musicalIntervals).forEach((key) => {
    const hasNotBeenChosen = !settings.intervals.includes(musicalIntervals[key]);
    const columnClassNames = Object.assign({}, commonColumnClassNames, {
      'hidden-xs': hasNotBeenChosen,
      'hidden-sm': hasNotBeenChosen
    });
    const musicalinterval = {
      name: musicalIntervalNames[key].short,
      columnClassNames
    };

    const value = musicalIntervals[key];
    const isIntervalInAscIncorrect = incorrectAnswers.includes(String(value));
    const isIntervalInDescIncorrect = incorrectAnswers.includes(String(-value));

    if (hasAscDirection) {
      ascMusicalIntervals.push(Object.assign({}, musicalinterval, {
        value,
        direction: musicalIntervalDirections.ASC,
        buttonClassNames: Object.assign({}, commonButtonClassNames, {
          'btn--incorrect': isIntervalInAscIncorrect
        }),
        isDisabled: hasNotBeenChosen || isIntervalInAscIncorrect
      }));
    }

    if (hasDescDirection) {
      descMusicalIntervals.push(Object.assign({}, musicalinterval, {
        value: -value,
        direction: musicalIntervalDirections.DESC,
        buttonClassNames: Object.assign({}, commonButtonClassNames, {
          'btn--incorrect': isIntervalInDescIncorrect
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

  return (
    <div className="game">
      <fieldset style={ascIntervalSelectionStyle} className="module">
        <legend className="module__caption">Ascending</legend>

        <div className="module__content">
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
      </fieldset>

      <fieldset style={descIntervalSelectionStyle} className="module">
        <legend className="module__caption">Descending</legend>

        <div className="module__content">
          <h2 className="interval-selection__heading">Descending</h2>

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

