import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import RatingTableRow from '../components/RatingTableRow.jsx';


class Rating extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      topPlayers: [],
      playerId: props.game.playerId
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.rating) {
      this.setState({
        topPlayers: this.getTopPlayers(nextProps.rating.players)
      });
    }

    if (this.state.playerId === null && nextProps.game.playerId) {
      this.setState({
        playerId: nextProps.game.playerId
      });
    }
  }

  getTopPlayers(players, count = 1) {
    const sortedPlayers = players.sort((playerA, playerB) => playerB.score - playerA.score);
    const topPlayers = [];
    let isPlayerInList = false;

    for (let i = 0; i < sortedPlayers.length; i++) {
      if (!isPlayerInList && sortedPlayers[i].id === this.state.playerId) {
        isPlayerInList = true;
      }

      if (isPlayerInList || i < count) {
        topPlayers.push({
          rank: i + 1,
          id: sortedPlayers[i].id,
          name: sortedPlayers[i].name,
          country: sortedPlayers[i].country,
          score: sortedPlayers[i].score
        });
      }

      if (isPlayerInList && i >= count) {
        break;
      }
    }

    return topPlayers;
  }

  render() {
    return (
      <table className="top-players">
        <thead>
          <tr>
            <th className="top-players__rank">&nbsp;</th>
            <th className="top-players__name">Name</th>
            <th className="top-players__score">Score</th>
          </tr>
        </thead>
        <tbody>
        {this.state.topPlayers.map((player) => (
          <RatingTableRow
            key={player.rank}
            player={player}
            isHighlighted={player.id === this.state.playerId}
          />
        ))}
        </tbody>
      </table>
    );
  }

}


function mapStateToProps(state) {
  return {
    rating: state.rating,
    game: state.game
  };
}

Rating.propTypes = {
  rating: PropTypes.object.isRequired,
  game: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(Rating);
