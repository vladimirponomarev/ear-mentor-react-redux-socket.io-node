import React, { PropTypes } from 'react';
import RatingTableRow from './RatingTableRow';


const RatingTable = ({ players, playerId }) => (
  <table className="rating-table">
    <tbody>
      {players.map(player => (
        <RatingTableRow key={player.rank} player={player} isHighlighted={player.id === playerId} />
      ))}
    </tbody>
  </table>
);

RatingTable.propTypes = {
  players: PropTypes.array.isRequired,
  playerId: PropTypes.number.isRequired
};

export default RatingTable;

