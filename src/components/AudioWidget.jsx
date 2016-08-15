import React, { PropTypes } from 'react';


const AudioWidget = ({
  onRepeatButtonClick
}) => (
  <div className="audio-widget">
    <fieldset className="audio-widget__fieldset">
      <legend>&nbsp;</legend>
    </fieldset>

    <div className="row">
      <div className="col-sm-4 col-lg-8">&nbsp;</div>
      <div className="col-sm-8 col-lg-4 text-right">
        <button onClick={onRepeatButtonClick} className="btn btn-shadow btn-secondary">
          Repeat
        </button>
      </div>
    </div>
  </div>
);

AudioWidget.propTypes = {
  onRepeatButtonClick: PropTypes.func.isRequired
};

export default AudioWidget;
