import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';
import * as ratingActions from '../actions/ratingActions';
import * as periods from '../constants/periods';


class Rating extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      currentPlayers: [],
      ratingForPeriod: [],
      period: periods.NOW
    };

    this.changePeriod = this.changePeriod.bind(this);
  }

  changePeriod(event) {
    event.preventDefault();

    const period = event.target.value;
    if (this.state.period === period) {
      return;
    }

    if (period !== periods.NOW) {
      this.props.ratingActions.requestRating(period);
    }

    this.setState({
      period
    });
  }


  render() {
    const btnPeriodNow = classNames({
      tabs__btn: true,
      'tabs__btn--active': this.state.period === periods.NOW
    });
    const btnPeriodMonth = classNames({
      tabs__btn: true,
      'tabs__btn--active': this.state.period === periods.MONTH
    });
    const btnPeriodYear = classNames({
      tabs__btn: true,
      'tabs__btn--active': this.state.period === periods.YEAR
    });
    const btnPeriodAllTime = classNames({
      tabs__btn: true,
      'tabs__btn--active': this.state.period === periods.ALL_TIME
    });

    const tabContentCurrentPlayersStyle = {
      display: this.state.period === periods.NOW ? 'block' : 'none'
    };

    const tabContentRatingForPeriodStyle = {
      display: this.state.period !== periods.NOW ? 'block' : 'none'
    };


    return (
      <div className="container">
        <div className="tabs">
          <button
            className={btnPeriodNow}
            onClick={this.changePeriod}
            value={periods.NOW}
          >
            Now
          </button>

          <button
            className={btnPeriodMonth}
            onClick={this.changePeriod}
            value={periods.MONTH}
          >
            Month
          </button>

          <button
            className={btnPeriodYear}
            onClick={this.changePeriod}
            value={periods.YEAR}
          >
            Year
          </button>

          <button
            className={btnPeriodAllTime}
            onClick={this.changePeriod}
            value={periods.ALL_TIME}
          >
            All Time
          </button>
        </div>

        <div className="tabs__content">
          <div style={tabContentCurrentPlayersStyle} className="tabs__content-item">
            {this.state.currentPlayers.length}
          </div>
          <div style={tabContentRatingForPeriodStyle} className="tabs__content-item">
            {this.state.ratingForPeriod.length}
          </div>
        </div>
      </div>
    );
  }

}

Rating.propTypes = {
  ratingActions: PropTypes.object.isRequired,
  rating: PropTypes.object.isRequired
};


function mapStateToProps(state) {
  return {
    rating: state.rating
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ratingActions: bindActionCreators(ratingActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Rating);

