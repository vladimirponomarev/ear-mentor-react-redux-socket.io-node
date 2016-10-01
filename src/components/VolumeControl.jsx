import React, { PropTypes } from 'react';
import classNames from 'classnames';


const VolumeControl = ({
  volume,
  hoveredVolume,
  onClickVolume,
  onMouseOverVolume,
  onMouseOutVolume
}) => {
  const volumeControlButton20 = classNames({
    'volume-control__button': true,
    'volume-control__button--20': true,
    'volume-control__button--active': volume >= 0.2 && hoveredVolume === 0,
    'volume-control__button--hovered': hoveredVolume >= 0.2
  });
  const volumeControlButton40 = classNames({
    'volume-control__button': true,
    'volume-control__button--40': true,
    'volume-control__button--active': volume >= 0.4 && hoveredVolume === 0,
    'volume-control__button--hovered': hoveredVolume >= 0.4
  });
  const volumeControlButton60 = classNames({
    'volume-control__button': true,
    'volume-control__button--60': true,
    'volume-control__button--active': volume >= 0.6 && hoveredVolume === 0,
    'volume-control__button--hovered': hoveredVolume >= 0.6
  });
  const volumeControlButton80 = classNames({
    'volume-control__button': true,
    'volume-control__button--80': true,
    'volume-control__button--active': volume >= 0.8 && hoveredVolume === 0,
    'volume-control__button--hovered': hoveredVolume >= 0.8
  });
  const volumeControlButton100 = classNames({
    'volume-control__button': true,
    'volume-control__button--100': true,
    'volume-control__button--active': volume === 1 && hoveredVolume === 0,
    'volume-control__button--hovered': hoveredVolume >= 1
  });

  return (
    <div className="volume-control">
      <button
        className={volumeControlButton20}
        value={0.2}
        onClick={onClickVolume}
        onMouseOver={onMouseOverVolume}
        onMouseOut={onMouseOutVolume}
      />
      <button
        className={volumeControlButton40}
        value={0.4}
        onClick={onClickVolume}
        onMouseOver={onMouseOverVolume}
        onMouseOut={onMouseOutVolume}
      />
      <button
        className={volumeControlButton60}
        value={0.6}
        onClick={onClickVolume}
        onMouseOver={onMouseOverVolume}
        onMouseOut={onMouseOutVolume}
      />
      <button
        className={volumeControlButton80}
        value={0.8}
        onClick={onClickVolume}
        onMouseOver={onMouseOverVolume}
        onMouseOut={onMouseOutVolume}
      />
      <button
        className={volumeControlButton100}
        value={1}
        onClick={onClickVolume}
        onMouseOver={onMouseOverVolume}
        onMouseOut={onMouseOutVolume}
      />
    </div>
  );
};

VolumeControl.propTypes = {
  onClickVolume: PropTypes.func.isRequired,
  onMouseOverVolume: PropTypes.func.isRequired,
  onMouseOutVolume: PropTypes.func.isRequired,
  volume: PropTypes.number.isRequired,
  hoveredVolume: PropTypes.number.isRequired
};

export default VolumeControl;
