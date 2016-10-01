/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import GameOverModal from './GameOverModal.jsx';


const setup = ({ isVisible = false, score = 0 }) => {
  const props = {
    isVisible,
    score,
    onClickReplay: () => {}
  };

  const component = shallow(
    <GameOverModal {...props} />
  );

  return {
    component,
    props,
    message: component.find('.modal__message')
  };
};


describe('GameOverModal Component', () => {
  it('should show the modal', () => {
    const { component } = setup({
      isVisible: true
    });

    expect(component.props().isOpen).toBeTruthy();
  });

  it('should show the correct score', () => {
    const score = 430;
    const options = {
      isVisible: true,
      score
    };

    const { message } = setup(options);

    expect(message).toMatch(new RegExp(score));
  });
});
