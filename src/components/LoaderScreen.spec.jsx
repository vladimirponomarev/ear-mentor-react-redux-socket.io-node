/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import LoaderScreen from './LoaderScreen.jsx';


const setup = ({ isVisible = false, progress = 0 }) => {
  const props = {
    isVisible,
    progress
  };

  const component = shallow(
    <LoaderScreen {...props} />
  );

  return {
    component,
    progressBar: component.find('.loader-screen__progress-bar'),
    props
  };
};


describe('LoaderScreen Component', () => {
  it('should show the the loader', () => {
    const { component } = setup({
      isVisible: true
    });

    expect(component.props().style.display).toBe('block');
  });

  it('should set the element class corresponding with progress equal to 10', () => {
    const { progressBar } = setup({
      isVisible: true,
      progress: 10
    });

    expect(progressBar.props().className).toMatch(new RegExp('progress-bar--10'));
  });

  it('should set the element class corresponding with progress equal to 50', () => {
    const { progressBar } = setup({
      isVisible: true,
      progress: 50
    });

    expect(progressBar.props().className).toMatch(new RegExp('progress-bar--50'));
  });

  it('should set the element class corresponding with progress equal to 100', () => {
    const { progressBar } = setup({
      isVisible: true,
      progress: 100
    });

    expect(progressBar.props().className).toMatch(new RegExp('progress-bar--100'));
  });
});
