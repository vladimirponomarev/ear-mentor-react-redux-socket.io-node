import React, { PropTypes } from 'react';

const Spinner = ({ isVisible }) => {
  const style = {
    display: isVisible ? 'block' : 'none'
  };

  return (
    <div style={style} className="spinner">Spinner</div>
  );
};

Spinner.propTypes = {
  isVisible: PropTypes.bool.isRequired
};

export default Spinner;
