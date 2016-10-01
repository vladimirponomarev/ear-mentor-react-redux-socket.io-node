import React, { PropTypes } from 'react';
import classNames from 'classnames';


const RatingTableRow = ({ player, isHighlighted }) => {
  const rowClassName = classNames({
    'rating-table__row': true,
    'rating-table__row--highlighted': isHighlighted
  });

  const countryClassName = `flag-icon flag-icon-${player.country.toLowerCase()}`;

  let date = '';
  if (player.date) {
    date = new Date(player.date).toISOString().replace(/T.+/, '');
  }


  return (
    <tr className={rowClassName}>
      <td className="rating-table__column rating-table__column--rank text-center">
        {player.rank}
      </td>
      <td className="rating-table__column rating-table__column--name">
        <span className={countryClassName} />

        {player.name}
      </td>
      <td className="rating-table__column rating-table__column--score text-center">
        {player.score} points
      </td>
      <td className="rating-table__column rating-table__column--date">{date}</td>
    </tr>
  );
};

RatingTableRow.propTypes = {
  player: PropTypes.object.isRequired,
  isHighlighted: PropTypes.bool.isRequired
};

export default RatingTableRow;

