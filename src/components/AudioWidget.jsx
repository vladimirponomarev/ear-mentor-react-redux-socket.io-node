import React, { PropTypes } from 'react';
import VolumeControl from './VolumeControl.jsx';
import * as musicalTempoLimits from '../constants/musicalTempoLimits';


const AudioWidget = ({
  tempo,
  volume,
  hoveredVolume,
  onClickRepeat,
  onChangeTempo,
  onClickVolume,
  onMouseOverVolume,
  onMouseOutVolume
}) => (
  <fieldset className="module audio-widget">
    <legend className="module__caption">Audio</legend>

    <div className="module__content">
      <div className="row">
        <div className="col-lg-2 text-center">
          <label className="audio-widget__label" htmlFor="tempo">BPM:</label>
        </div>
        <div className="col-lg-3">
          <input
            className="audio-widget__input"
            type="number"
            id="tempo"
            onChange={onChangeTempo}
            value={tempo}
            min={musicalTempoLimits.MIN}
            max={musicalTempoLimits.MAX}
          />
        </div>
        <div className="col-lg-4 text-right">
          <span className="audio-widget__label">Volume:</span>
        </div>
        <div className="col-lg-3">
          <VolumeControl
            onClickVolume={onClickVolume}
            onMouseOverVolume={onMouseOverVolume}
            onMouseOutVolume={onMouseOutVolume}
            volume={volume}
            hoveredVolume={hoveredVolume}
          />
        </div>
        <div className="col-sm-12 text-left">
          <button
            onClick={onClickRepeat}
            className="btn btn--primary btn--shadow btn--top-offset"
          >
            Repeat
          </button>
        </div>
      </div>
    </div>
  </fieldset>
);

AudioWidget.propTypes = {
  onClickRepeat: PropTypes.func.isRequired,
  onChangeTempo: PropTypes.func.isRequired,
  onClickVolume: PropTypes.func.isRequired,
  onMouseOverVolume: PropTypes.func.isRequired,
  onMouseOutVolume: PropTypes.func.isRequired,
  tempo: PropTypes.number.isRequired,
  volume: PropTypes.number.isRequired,
  hoveredVolume: PropTypes.number.isRequired
};

export default AudioWidget;
