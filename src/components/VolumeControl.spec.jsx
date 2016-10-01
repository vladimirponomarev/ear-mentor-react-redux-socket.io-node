/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import VolumeControl from './VolumeControl.jsx';


const setup = ({ volume = 1, hoveredVolume = 1 }) => {
  const props = {
    volume,
    hoveredVolume,
    onClickVolume: () => {},
    onMouseOverVolume: () => {},
    onMouseOutVolume: () => {}
  };

  const component = shallow(
    <VolumeControl {...props} />
  );

  return {
    component,
    props
  };
};


describe('VolumeControl Component', () => {
  it('should hover all buttons', () => {
    const { component } = setup({
      volume: 0.2,
      hoveredVolume: 1
    });

    expect(component.find('button').at(0).props().className).toMatch('hovered');
    expect(component.find('button').at(1).props().className).toMatch('hovered');
    expect(component.find('button').at(2).props().className).toMatch('hovered');
    expect(component.find('button').at(3).props().className).toMatch('hovered');
    expect(component.find('button').at(4).props().className).toMatch('hovered');
  });

  it('should hover only first three buttons', () => {
    const { component } = setup({
      volume: 0.2,
      hoveredVolume: 0.6
    });

    expect(component.find('button').at(0).props().className).toMatch('hovered');
    expect(component.find('button').at(1).props().className).toMatch('hovered');
    expect(component.find('button').at(2).props().className).toMatch('hovered');
    expect(component.find('button').at(3).props().className).toNotMatch('hovered');
    expect(component.find('button').at(4).props().className).toNotMatch('hovered');
  });

  it('should activate all buttons', () => {
    const { component } = setup({
      volume: 1,
      hoveredVolume: 0
    });

    expect(component.find('button').at(0).props().className).toMatch('active');
    expect(component.find('button').at(1).props().className).toMatch('active');
    expect(component.find('button').at(2).props().className).toMatch('active');
    expect(component.find('button').at(3).props().className).toMatch('active');
    expect(component.find('button').at(4).props().className).toMatch('active');
  });

  it('should activate only first three buttons', () => {
    const { component } = setup({
      volume: 0.6,
      hoveredVolume: 0
    });

    expect(component.find('button').at(0).props().className).toMatch('active');
    expect(component.find('button').at(1).props().className).toMatch('active');
    expect(component.find('button').at(2).props().className).toMatch('active');
    expect(component.find('button').at(3).props().className).toNotMatch('active');
    expect(component.find('button').at(4).props().className).toNotMatch('active');
  });

  it('should not activate any buttons', () => {
    const { component } = setup({
      volume: 0,
      hoveredVolume: 0
    });

    expect(component.find('button').at(0).props().className).toNotMatch('active');
    expect(component.find('button').at(1).props().className).toNotMatch('active');
    expect(component.find('button').at(2).props().className).toNotMatch('active');
    expect(component.find('button').at(3).props().className).toNotMatch('active');
    expect(component.find('button').at(4).props().className).toNotMatch('active');
  });
});
