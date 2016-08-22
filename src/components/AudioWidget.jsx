import React, { PropTypes } from 'react';


const AudioWidget = ({
  onRepeatButtonClick
}) => (
  <fieldset className="module">
    <legend className="module__caption">Audio</legend>

    <div className="module__content">
      <div className="row">
        <div className="col-sm-4 col-lg-8">&nbsp;</div>
        <div className="col-sm-8 col-lg-4 text-right">
          <button onClick={onRepeatButtonClick} className="btn btn-shadow btn-primary">
            Repeat
          </button>
        </div>
      </div>
    </div>
  </fieldset>
);

AudioWidget.propTypes = {
  onRepeatButtonClick: PropTypes.func.isRequired
};

export default AudioWidget;
