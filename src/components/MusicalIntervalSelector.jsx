import React, { PropTypes } from 'react';
import classNames from 'classnames';


const MusicalIntervalSelector = ({
  musicalInterval,
  onClick
}) => {
  const columnClassName = classNames(musicalInterval.columnClassNames);
  const buttonClassName = classNames(musicalInterval.buttonClassNames);

  return (
    <div className={columnClassName}>
      <button
        className={buttonClassName}
        type="button"
        disabled={musicalInterval.isDisabled}
        value={musicalInterval.value}
        onClick={onClick}
      >
        {musicalInterval.name}
      </button>
    </div>
  );
};

MusicalIntervalSelector.propTypes = {
  musicalInterval: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired
};

export default MusicalIntervalSelector;
