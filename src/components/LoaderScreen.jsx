import React, { PropTypes } from 'react';
import classNames from 'classnames';

const LoaderScreenComponent = ({ isVisible, progress }) => {
  const overlayStyle = {
    display: isVisible ? 'block' : 'none'
  };

  const progressBarClassName = classNames({
    'loader-screen__progress-bar': true,
    'loader-screen__progress-bar--10': progress >= 10 && progress < 20,
    'loader-screen__progress-bar--20': progress >= 20 && progress < 30,
    'loader-screen__progress-bar--30': progress >= 30 && progress < 40,
    'loader-screen__progress-bar--40': progress >= 40 && progress < 50,
    'loader-screen__progress-bar--50': progress >= 50 && progress < 60,
    'loader-screen__progress-bar--60': progress >= 60 && progress < 70,
    'loader-screen__progress-bar--70': progress >= 70 && progress < 80,
    'loader-screen__progress-bar--80': progress >= 80 && progress < 90,
    'loader-screen__progress-bar--90': progress >= 90 && progress < 100,
    'loader-screen__progress-bar--100': progress >= 100
  });

  return (
    <div style={overlayStyle} className="loader-screen">
      <div className={progressBarClassName} />
      <div className="loader-screen__overlay">{progress}%</div>
    </div>
  );
};

LoaderScreenComponent.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  progress: PropTypes.number.isRequired
};

export default LoaderScreenComponent;
