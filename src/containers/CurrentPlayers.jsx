import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import RatingTable from '../components/RatingTable.jsx';
import PlayerSorter from '../utils/PlayerSorter';


class CurrentPlayers extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      topPlayers: PlayerSorter.getTopPlayers(props.rating.currentPlayers, props.game.playerId),
      playerId: props.game.playerId
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      topPlayers: PlayerSorter.getTopPlayers(nextProps.rating.currentPlayers, this.state.playerId)
    });

    if (this.state.playerId === null && nextProps.game.playerId) {
      this.setState({
        playerId: nextProps.game.playerId
      });
    }
  }

  render() {
    return (
      <div className="module">
        <h2 className="module__caption">Current Players</h2>

        <div className="module__content">
          <RatingTable players={this.state.topPlayers} playerId={this.state.playerId} />
        </div>
      </div>
    );
  }

}


function mapStateToProps(state) {
  return {
    rating: state.rating,
    game: state.game
  };
}

CurrentPlayers.propTypes = {
  rating: PropTypes.object.isRequired,
  game: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(CurrentPlayers);
