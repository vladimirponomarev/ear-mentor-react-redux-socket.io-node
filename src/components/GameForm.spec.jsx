/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import GameForm from './GameForm.jsx';
import * as musicalIntervals from '../constants/musicalIntervals';
import * as musicalIntervalDirections from '../constants/musicalIntervalDirections';


const setup = ({ settings, incorrectAnswers = [] }) => {
  const props = {
    settings,
    incorrectAnswers,
    onClickMusicalInterval: () => {}
  };

  const component = shallow(
    <GameForm {...props} />
  );

  return {
    component,
    props
  };
};


describe('GameForm Component', () => {
  it('should show only ascending direction intervals', () => {
    const settings = {
      intervals: [musicalIntervals.MAJOR_SECOND, musicalIntervals.PERFECT_FIFTH],
      directions: [musicalIntervalDirections.ASC]
    };

    const { component } = setup({
      settings
    });

    expect(component.find('.interval-set--desc-direction').props().style.display).toBe('none');
    expect(component.find('.interval-set--asc-direction').props().style.display).toBe('block');
  });

  it('should show only descending direction intervals', () => {
    const settings = {
      intervals: [musicalIntervals.MAJOR_SECOND, musicalIntervals.PERFECT_FIFTH],
      directions: [musicalIntervalDirections.DESC]
    };

    const { component } = setup({
      settings
    });

    expect(component.find('.interval-set--desc-direction').props().style.display).toBe('block');
    expect(component.find('.interval-set--asc-direction').props().style.display).toBe('none');
  });

  it('should show both ascending and descending direction intervals', () => {
    const settings = {
      intervals: [musicalIntervals.MAJOR_SECOND, musicalIntervals.PERFECT_FIFTH],
      directions: [musicalIntervalDirections.DESC, musicalIntervalDirections.ASC]
    };

    const { component } = setup({
      settings
    });

    expect(component.find('.interval-set--desc-direction').props().style.display).toBe('block');
    expect(component.find('.interval-set--asc-direction').props().style.display).toBe('block');
  });
});
