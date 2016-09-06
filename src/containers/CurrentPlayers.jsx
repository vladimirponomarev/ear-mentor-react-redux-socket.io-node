import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import RatingTable from '../components/RatingTable.jsx';


class CurrentPlayers extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      topPlayers: [],
      playerId: props.game.playerId
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      topPlayers: this.getTopPlayers(nextProps.rating.currentPlayers)
    });

    if (this.state.playerId === null && nextProps.game.playerId) {
      this.setState({
        playerId: nextProps.game.playerId
      });
    }
  }

  getTopPlayers(players, limit = 10) {
    const sortedPlayers = players.sort((playerA, playerB) => playerB.score - playerA.score);
    const topPlayers = [];
    let isPlayerInList = false;

    for (let i = 0; i < sortedPlayers.length; i++) {
      if (!isPlayerInList && sortedPlayers[i].id === this.state.playerId) {
        isPlayerInList = true;
      }

      if (isPlayerInList || i < limit) {
        topPlayers.push({
          rank: i + 1,
          id: sortedPlayers[i].id,
          name: sortedPlayers[i].name,
          country: sortedPlayers[i].country,
          score: sortedPlayers[i].score
        });
      }

      if (isPlayerInList && i >= limit) {
        break;
      }
    }

    return topPlayers;
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
