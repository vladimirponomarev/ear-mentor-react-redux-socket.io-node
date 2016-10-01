class PlayerSorter {

  static getTopPlayers(players, currentPlayerId, limit = 10) {
    const sortedPlayers = players.sort((playerA, playerB) => playerB.score - playerA.score);
    const topPlayers = [];
    let isPlayerInList = false;

    for (let i = 0; i < sortedPlayers.length; i++) {
      if (!isPlayerInList && sortedPlayers[i].id === currentPlayerId) {
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

}

export default PlayerSorter;
