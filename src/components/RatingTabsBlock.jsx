import React, { PropTypes } from 'react';
import classNames from 'classnames';
import RatingTable from './RatingTable.jsx';
import * as periods from '../constants/periods';


const RatingTabsBlock = ({ currentPlayers, ratingForPeriod, period, onChangePeriod }) => {
  const btnPeriodNow = classNames({
    tabs__btn: true,
    'tabs__btn--active': period === periods.NOW
  });
  const btnPeriodMonth = classNames({
    tabs__btn: true,
    'tabs__btn--active': period === periods.MONTH
  });
  const btnPeriodYear = classNames({
    tabs__btn: true,
    'tabs__btn--active': period === periods.YEAR
  });
  const btnPeriodAllTime = classNames({
    tabs__btn: true,
    'tabs__btn--active': period === periods.ALL_TIME
  });

  const tabContentCurrentPlayersStyle = {
    display: period === periods.NOW ? 'block' : 'none'
  };

  const tabContentRatingForPeriodStyle = {
    display: period !== periods.NOW ? 'block' : 'none'
  };


  return (
    <div className="container">
      <div className="tabs">
        <button
          className={btnPeriodNow}
          onClick={onChangePeriod}
          value={periods.NOW}
        >
          Now
        </button>

        <button
          className={btnPeriodMonth}
          onClick={onChangePeriod}
          value={periods.MONTH}
        >
          Month
        </button>

        <button
          className={btnPeriodYear}
          onClick={onChangePeriod}
          value={periods.YEAR}
        >
          Year
        </button>

        <button
          className={btnPeriodAllTime}
          onClick={onChangePeriod}
          value={periods.ALL_TIME}
        >
          All Time
        </button>
      </div>

      <div className="tabs__content">
        <div className="row">
          <div className="col-sm-12 col-md-6 col-md-offset-3">
            <div style={tabContentCurrentPlayersStyle} className="tabs__content-item">
              <p>At the moment no one is playing. Start a game.</p>
              <p>Current players.</p>

              <RatingTable players={currentPlayers} playerId={0} />
            </div>

            <div style={tabContentRatingForPeriodStyle} className="tabs__content-item">
              <p>People with the highest score for the selected period.</p>

              <RatingTable players={ratingForPeriod} playerId={0} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

RatingTabsBlock.propTypes = {
  currentPlayers: PropTypes.array.isRequired,
  ratingForPeriod: PropTypes.array.isRequired,
  period: PropTypes.string.isRequired,
  onChangePeriod: PropTypes.func.isRequired
};

export default RatingTabsBlock;

