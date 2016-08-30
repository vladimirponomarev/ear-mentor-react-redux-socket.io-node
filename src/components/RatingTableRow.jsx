import React, { PropTypes } from 'react';
import classNames from 'classnames';


const RatingTableRow = ({ player, isHighlighted }) => {
  const rowClassName = classNames({
    'rating-table__row': true,
    'rating-table__row--highlighted': isHighlighted
  });

  const countryClassName = `flag-icon flag-icon-${player.country.toLowerCase()}`;

  return (
    <tr className={rowClassName}>
      <td className="text-center">{player.rank}</td>
      <td>
        <span className={countryClassName}></span>

        {player.name}
      </td>
      <td className="text-center">{player.score} points</td>
    </tr>
  );
};

RatingTableRow.propTypes = {
  player: PropTypes.object.isRequired,
  isHighlighted: PropTypes.bool.isRequired
};

export default RatingTableRow;

