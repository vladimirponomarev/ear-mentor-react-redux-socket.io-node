import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import RatingTabsBlock from '../components/RatingTabsBlock';
import * as ratingActions from '../actions/ratingActions';
import * as periods from '../constants/periods';
import getTopPlayers from '../utils/PlayerSorter';


class Rating extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      currentPlayers: [],
      ratingForPeriod: props.rating.rating,
      period: periods.NOW
    };

    this.changePeriod = this.changePeriod.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      currentPlayers: getTopPlayers(nextProps.rating.currentPlayers, null, 50),
      ratingForPeriod: nextProps.rating.rating
    });
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
    return (
      <RatingTabsBlock
        currentPlayers={this.state.currentPlayers}
        ratingForPeriod={this.state.ratingForPeriod}
        period={this.state.period}
        onChangePeriod={this.changePeriod}
      />
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

