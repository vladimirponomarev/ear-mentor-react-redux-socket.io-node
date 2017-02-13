/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import RatingTableRow from './RatingTableRow';


const setup = ({ player, isHighlighted = false }) => {
  const props = {
    player,
    isHighlighted
  };

  const component = shallow(
    <RatingTableRow {...props} />
  );

  return {
    component,
    props
  };
};


describe('RatingTableRow Component', () => {
  it('should display the rating table row', () => {
    const dateString = '2016-09-10';
    const country = 'ru';
    const player = {
      rank: 1,
      name: 'Jane Doe',
      date: new Date(dateString),
      score: 10,
      country
    };

    const { component } = setup({
      player
    });


    expect(component.find('.rating-table__column--rank').text()).toMatch(new RegExp(player.rank));
    expect(component.find('.rating-table__column--name').text()).toMatch(new RegExp(player.name));
    expect(component.find('.rating-table__column--score').text()).toMatch(new RegExp(player.score));
    expect(component.find('.rating-table__column--date').text()).toMatch(new RegExp(dateString));
    expect(component.find('.flag-icon').props().className).toMatch(country);
  });

  it('should display the highlighted rating table row', () => {
    const dateString = '2016-09-10';
    const country = 'ru';
    const player = {
      rank: 1,
      name: 'Jane Doe',
      date: new Date(dateString),
      score: 10,
      country
    };

    const { component } = setup({
      player,
      isHighlighted: true
    });


    expect(component.props().className).toMatch(new RegExp('rating-table__row--highlighted'));
  });
});
