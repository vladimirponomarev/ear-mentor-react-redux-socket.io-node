import React, { PropTypes } from 'react';
import * as musicalIntervals from '../constants/musicalIntervals';
import * as musicalIntervalDirections from '../constants/musicalIntervalDirections';


const GameForm = ({
  settings,
  onMusicalIntervalClick
}) => {
  const hasAscDirection = settings.directions.includes(musicalIntervalDirections.ASC);
  const hasDescDirection = settings.directions.includes(musicalIntervalDirections.DESC);

  const hasMinorSecond = settings.intervals.includes(musicalIntervals.MINOR_SECOND);
  const hasMajorSecond = settings.intervals.includes(musicalIntervals.MAJOR_SECOND);
  const hasMinorThird = settings.intervals.includes(musicalIntervals.MINOR_THIRD);
  const hasMajorThird = settings.intervals.includes(musicalIntervals.MAJOR_THIRD);
  const hasPerfectFourth = settings.intervals.includes(musicalIntervals.PERFECT_FOURTH);
  const hasTritone = settings.intervals.includes(musicalIntervals.TRITONE);
  const hasPerfectFifth = settings.intervals.includes(musicalIntervals.PERFECT_FIFTH);
  const hasMinorSixth = settings.intervals.includes(musicalIntervals.MINOR_SIXTH);
  const hasMajorSixth = settings.intervals.includes(musicalIntervals.MAJOR_SIXTH);
  const hasMinorSeventh = settings.intervals.includes(musicalIntervals.MINOR_SEVENTH);
  const hasMajorSeventh = settings.intervals.includes(musicalIntervals.MAJOR_SEVENTH);
  const hasPerfectOctave = settings.intervals.includes(musicalIntervals.PERFECT_OCTAVE);

  const ascIntervalSelectionStyle = {
    display: hasAscDirection ? 'block' : 'none'
  };
  const descIntervalSelectionStyle = {
    display: hasDescDirection ? 'block' : 'none'
  };

  return (
    <div className="game">
      <fieldset className="game__fieldset">
        <legend>Select Interval</legend>

        <div style={ascIntervalSelectionStyle} className="interval-selection">
          <h2 className="interval-selection__heading">Ascending</h2>

          <div className="row">
            <div className="col-sm-12 col-md-3 col-lg-2">
              <button
                className="btn btn-block btn-shadow btn-primary"
                type="button"
                disabled={!hasAscDirection || !hasMinorSecond}
                value={musicalIntervals.MINOR_SECOND}
                onClick={onMusicalIntervalClick}
              >
                &uarr; m2
              </button>
            </div>

            <div className="col-sm-12 col-md-3 col-lg-2">
              <button
                className="btn btn-block btn-shadow btn-primary"
                type="button"
                disabled={!hasAscDirection || !hasMajorSecond}
                value={musicalIntervals.MAJOR_SECOND}
                onClick={onMusicalIntervalClick}
              >
                &uarr; M2
              </button>
            </div>

            <div className="col-sm-12 col-md-3 col-lg-2">
              <button
                className="btn btn-block btn-shadow btn-primary"
                type="button"
                disabled={!hasAscDirection || !hasMinorThird}
                value={musicalIntervals.MINOR_THIRD}
                onClick={onMusicalIntervalClick}
              >
                &uarr; m3
              </button>
            </div>

            <div className="col-sm-12 col-md-3 col-lg-2">
              <button
                className="btn btn-block btn-shadow btn-primary"
                type="button"
                disabled={!hasAscDirection || !hasMajorThird}
                value={musicalIntervals.MAJOR_THIRD}
                onClick={onMusicalIntervalClick}
              >
                &uarr; M3
              </button>
            </div>

            <div className="col-sm-12 col-md-3 col-lg-2">
              <button
                className="btn btn-block btn-shadow btn-primary"
                type="button"
                disabled={!hasAscDirection || !hasPerfectFourth}
                value={musicalIntervals.PERFECT_FOURTH}
                onClick={onMusicalIntervalClick}
              >
                &uarr; P4
              </button>
            </div>

            <div className="col-sm-12 col-md-3 col-lg-2">
              <button
                className="btn btn-block btn-shadow btn-primary"
                type="button"
                disabled={!hasAscDirection || !hasTritone}
                value={musicalIntervals.TRITONE}
                onClick={onMusicalIntervalClick}
              >
                &uarr; Tritone
              </button>
            </div>

            <div className="col-sm-12 col-md-3 col-lg-2">
              <button
                className="btn btn-block btn-shadow btn-primary"
                type="button"
                disabled={!hasAscDirection || !hasPerfectFifth}
                value={musicalIntervals.PERFECT_FIFTH}
                onClick={onMusicalIntervalClick}
              >
                &uarr; P5
              </button>
            </div>

            <div className="col-sm-12 col-md-3 col-lg-2">
              <button
                className="btn btn-block btn-shadow btn-primary"
                type="button"
                disabled={!hasAscDirection || !hasMinorSixth}
                value={musicalIntervals.MINOR_SIXTH}
                onClick={onMusicalIntervalClick}
              >
                &uarr; m6
              </button>
            </div>

            <div className="col-sm-12 col-md-3 col-lg-2">
              <button
                className="btn btn-block btn-shadow btn-primary"
                type="button"
                disabled={!hasAscDirection || !hasMajorSixth}
                value={musicalIntervals.MAJOR_SIXTH}
                onClick={onMusicalIntervalClick}
              >
                &uarr; M6
              </button>
            </div>

            <div className="col-sm-12 col-md-3 col-lg-2">
              <button
                className="btn btn-block btn-shadow btn-primary"
                type="button"
                disabled={!hasAscDirection || !hasMinorSeventh}
                value={musicalIntervals.MINOR_SEVENTH}
                onClick={onMusicalIntervalClick}
              >
                &uarr; m7
              </button>
            </div>

            <div className="col-sm-12 col-md-3 col-lg-2">
              <button
                className="btn btn-block btn-shadow btn-primary"
                type="button"
                disabled={!hasAscDirection || !hasMajorSeventh}
                value={musicalIntervals.MAJOR_SEVENTH}
                onClick={onMusicalIntervalClick}
              >
                &uarr; M7
              </button>
            </div>

            <div className="col-sm-12 col-md-3 col-lg-2">
              <button
                className="btn btn-block btn-shadow btn-primary"
                type="button"
                disabled={!hasAscDirection || !hasPerfectOctave}
                value={musicalIntervals.PERFECT_OCTAVE}
                onClick={onMusicalIntervalClick}
              >
                &uarr; Octave
              </button>
            </div>
          </div>
        </div>

        <div style={descIntervalSelectionStyle} className="interval-selection">
          <h2 className="interval-selection__heading">descending</h2>

          <div className="row">
            <div className="col-sm-12 col-md-3 col-lg-2">
              <button
                className="btn btn-block btn-shadow btn-primary"
                type="button"
                disabled={!hasDescDirection || !hasMinorSecond}
                value={-musicalIntervals.MINOR_SECOND}
                onClick={onMusicalIntervalClick}
              >
                &darr; m2
              </button>
            </div>

            <div className="col-sm-12 col-md-3 col-lg-2">
              <button
                className="btn btn-block btn-shadow btn-primary"
                type="button"
                disabled={!hasDescDirection || !hasMajorSecond}
                value={-musicalIntervals.MAJOR_SECOND}
                onClick={onMusicalIntervalClick}
              >
                &darr; M2
              </button>
            </div>

            <div className="col-sm-12 col-md-3 col-lg-2">
              <button
                className="btn btn-block btn-shadow btn-primary"
                type="button"
                disabled={!hasDescDirection || !hasMinorThird}
                value={-musicalIntervals.MINOR_THIRD}
                onClick={onMusicalIntervalClick}
              >
                &darr; m3
              </button>
            </div>

            <div className="col-sm-12 col-md-3 col-lg-2">
              <button
                className="btn btn-block btn-shadow btn-primary"
                type="button"
                disabled={!hasDescDirection || !hasMajorThird}
                value={-musicalIntervals.MAJOR_THIRD}
                onClick={onMusicalIntervalClick}
              >
                &darr; M3
              </button>
            </div>

            <div className="col-sm-12 col-md-3 col-lg-2">
              <button
                className="btn btn-block btn-shadow btn-primary"
                type="button"
                disabled={!hasDescDirection || !hasPerfectFourth}
                value={-musicalIntervals.PERFECT_FOURTH}
                onClick={onMusicalIntervalClick}
              >
                &darr; P4
              </button>
            </div>

            <div className="col-sm-12 col-md-3 col-lg-2">
              <button
                className="btn btn-block btn-shadow btn-primary"
                type="button"
                disabled={!hasDescDirection || !hasTritone}
                value={-musicalIntervals.TRITONE}
                onClick={onMusicalIntervalClick}
              >
                &darr; Tritone
              </button>
            </div>

            <div className="col-sm-12 col-md-3 col-lg-2">
              <button
                className="btn btn-block btn-shadow btn-primary"
                type="button"
                disabled={!hasDescDirection || !hasPerfectFifth}
                value={-musicalIntervals.PERFECT_FIFTH}
                onClick={onMusicalIntervalClick}
              >
                &darr; P5
              </button>
            </div>

            <div className="col-sm-12 col-md-3 col-lg-2">
              <button
                className="btn btn-block btn-shadow btn-primary"
                type="button"
                disabled={!hasDescDirection || !hasMinorSixth}
                value={-musicalIntervals.MINOR_SIXTH}
                onClick={onMusicalIntervalClick}
              >
                &darr; m6
              </button>
            </div>

            <div className="col-sm-12 col-md-3 col-lg-2">
              <button
                className="btn btn-block btn-shadow btn-primary"
                type="button"
                disabled={!hasDescDirection || !hasMajorSixth}
                value={-musicalIntervals.MAJOR_SIXTH}
                onClick={onMusicalIntervalClick}
              >
                &darr; M6
              </button>
            </div>

            <div className="col-sm-12 col-md-3 col-lg-2">
              <button
                className="btn btn-block btn-shadow btn-primary"
                type="button"
                disabled={!hasDescDirection || !hasMinorSeventh}
                value={-musicalIntervals.MINOR_SEVENTH}
                onClick={onMusicalIntervalClick}
              >
                &darr; m7
              </button>
            </div>

            <div className="col-sm-12 col-md-3 col-lg-2">
              <button
                className="btn btn-block btn-shadow btn-primary"
                type="button"
                disabled={!hasDescDirection || !hasMajorSeventh}
                value={-musicalIntervals.MAJOR_SEVENTH}
                onClick={onMusicalIntervalClick}
              >
                &darr; M7
              </button>
            </div>

            <div className="col-sm-12 col-md-3 col-lg-2">
              <button
                className="btn btn-block btn-shadow btn-primary"
                type="button"
                disabled={!hasDescDirection || !hasPerfectOctave}
                value={-musicalIntervals.PERFECT_OCTAVE}
                onClick={onMusicalIntervalClick}
              >
                &darr; Octave
              </button>
            </div>
          </div>
        </div>
      </fieldset>

    </div>
  );
};

GameForm.propTypes = {
  settings: PropTypes.object.isRequired,
  onMusicalIntervalClick: PropTypes.func.isRequired
};

export default GameForm;

