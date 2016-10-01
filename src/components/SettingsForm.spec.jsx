/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import SettingsForm from './SettingsForm.jsx';
import * as musicalIntervals from '../constants/musicalIntervals';


const setup = ({ errors = {}, settings, pointsPerAnswer = 0, countryFullName = '' }) => {
  const props = {
    settings,
    pointsPerAnswer,
    countryFullName,
    errors,
    onChangeMusicalInterval: () => {},
    onChangeMusicalIntervalDirection: () => {},
    onChangeName: () => {},
    onChangeCountry: () => {},
    onSelectInstrument: () => {},
    onStartGame: () => {},
    onClickAllIntervals: () => {},
    onClickRandomizeIntervals: () => {},
    onAutocompleteCountry: () => {}
  };

  const component = shallow(
    <SettingsForm {...props} />
  );

  return {
    component,
    props
  };
};


describe('SettingsForm Component', () => {
  it('should display all 12 musical interval checkboxes', () => {
    const { component } = setup({
      settings: {
        intervals: [],
        directions: []
      }
    });

    expect(component.find('.form--settings__musical-interval-setter').length).toBe(12);
  });

  it('should check only the minor second interval', () => {
    const { component } = setup({
      settings: {
        intervals: [musicalIntervals.MINOR_SECOND],
        directions: []
      }
    });

    expect(component.find('.form--settings__musical-interval-setter').at(0).props().checked).toBeTruthy();
    expect(component.find('.form--settings__musical-interval-setter').at(1).props().checked).toBeFalsy();
    expect(component.find('.form--settings__musical-interval-setter').at(2).props().checked).toBeFalsy();
    expect(component.find('.form--settings__musical-interval-setter').at(3).props().checked).toBeFalsy();
    expect(component.find('.form--settings__musical-interval-setter').at(4).props().checked).toBeFalsy();
    expect(component.find('.form--settings__musical-interval-setter').at(5).props().checked).toBeFalsy();
    expect(component.find('.form--settings__musical-interval-setter').at(6).props().checked).toBeFalsy();
    expect(component.find('.form--settings__musical-interval-setter').at(7).props().checked).toBeFalsy();
    expect(component.find('.form--settings__musical-interval-setter').at(8).props().checked).toBeFalsy();
    expect(component.find('.form--settings__musical-interval-setter').at(9).props().checked).toBeFalsy();
    expect(component.find('.form--settings__musical-interval-setter').at(10).props().checked).toBeFalsy();
    expect(component.find('.form--settings__musical-interval-setter').at(11).props().checked).toBeFalsy();
  });

  it('should display the value for points per answer', () => {
    const pointsPerAnswer = 10;
    const { component } = setup({
      pointsPerAnswer,
      settings: {
        intervals: [],
        directions: []
      }
    });

    expect(component.find('.points-per-answer-value').text()).toMatch(new RegExp(pointsPerAnswer));
  });
});
