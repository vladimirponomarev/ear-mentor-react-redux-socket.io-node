/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import AudioWidget from './AudioWidget.jsx';


const setup = ({ tempo }) => {
  const props = {
    tempo,
    volume: 1,
    hoveredVolume: 1,
    onClickRepeat: () => {},
    onChangeTempo: () => {},
    onClickVolume: () => {},
    onMouseOverVolume: () => {},
    onMouseOutVolume: () => {}
  };

  const component = shallow(
    <AudioWidget {...props} />
  );

  return {
    component,
    props,
    tempoInput: component.find('#tempo')
  };
};


describe('AudioWidget Component', () => {
  it('should display tempo', () => {
    const tempo = 120;

    const { tempoInput } = setup({
      tempo
    });

    expect(tempoInput.props().value).toBe(tempo);
  });
});
