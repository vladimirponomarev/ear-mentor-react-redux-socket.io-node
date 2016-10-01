/* eslint-disable import/no-extraneous-dependencies */
import expect from 'expect';
import PlayerSorter from './PlayerSorter';


describe('Player Sorter', () => {
  it('should get list of top players sorted by score', () => {
    const topPlayerScore = 2000;
    const players = [
      { id: 2, name: 'Jane Doe', score: topPlayerScore, country: 'RU' },
      { id: 1, name: 'John Doe', score: 500, country: 'US' }
    ];
    const result = PlayerSorter.getTopPlayers(players);

    expect(result[0].score).toEqual(topPlayerScore);
  });
});
