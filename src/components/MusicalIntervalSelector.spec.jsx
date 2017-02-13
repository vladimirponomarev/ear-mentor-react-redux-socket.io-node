/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import MusicalIntervalSelector from './MusicalIntervalSelector';
import * as musicalIntervals from '../constants/musicalIntervals';
import * as musicalIntervalNames from '../constants/musicalIntervalNames';


const setup = ({ musicalInterval }) => {
  const props = {
    musicalInterval,
    onClick: () => {}
  };

  const component = shallow(
    <MusicalIntervalSelector {...props} />
  );

  return {
    component,
    button: component.find('button'),
    props
  };
};


describe('MusicalIntervalSelector Component', () => {
  it('should disable the musical interval selection button', () => {
    const musicalInterval = {
      isDisabled: true,
      value: musicalIntervals.MAJOR_SECOND,
      name: musicalIntervalNames.MINOR_SECOND.short
    };

    const { button } = setup({
      musicalInterval
    });

    expect(button.props().disabled).toBeTruthy();
  });

  it('should contain a musical interval short name', () => {
    const musicalInterval = {
      isDisabled: true,
      value: musicalIntervals.MAJOR_SECOND,
      name: musicalIntervalNames.MINOR_SECOND.short
    };

    const { button } = setup({
      musicalInterval
    });

    expect(button.text()).toBe(musicalIntervalNames.MINOR_SECOND.short);
  });
});
