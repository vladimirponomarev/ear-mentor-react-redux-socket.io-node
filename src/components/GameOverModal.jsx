import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import ReactModal from 'react-modal';


const GameOverModal = ({
  isVisible,
  score,
  onClickReplay
}) => {
  const style = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, .5)'
    },
    content: {
      top: '50%',
      left: '50%',
      width: '400px',
      height: '280px',
      marginLeft: '-200px',
      marginTop: '-140px'
    }
  };

  return (
    <ReactModal style={style} isOpen={isVisible} contentLabel="The Game is Over">
      <h2 className="modal__title">The Game is Over</h2>

      <p className="modal__message">You have scored {score} points.</p>

      <div className="modal__action">
        <button onClick={onClickReplay} className="btn btn-primary btn-shadow btn-lg">
          Replay
        </button>
      </div>

      <div className="modal__action">
        <Link to="/">Go to the Index Page</Link>
      </div>
    </ReactModal>
  );
};


GameOverModal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onClickReplay: PropTypes.func.isRequired,
  score: PropTypes.number.isRequired
};

export default GameOverModal;
