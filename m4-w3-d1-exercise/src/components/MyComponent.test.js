// src/components/MyComponent.test.js
import React from 'react';
import renderer from 'react-test-renderer';
import MyComponent from './MyComponent';

describe('MyComponent', () => {
  it('renders without crashing', () => {
    const tree = renderer.create(<MyComponent />).toJSON();
    expect(tree).toBeTruthy();
  });

  it('matches the snapshot', () => {
    const tree = renderer.create(<MyComponent />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('creates an entry in component state', () => {
    const testRenderer = renderer.create(<MyComponent />);
    const instance = testRenderer.getInstance();

    // simulate change event
    instance.handleChange({
      target: {
        value: 'myValue'
      }
    });

    expect(instance.state.input).toBeDefined();
  });

  it('stores the event value in component state', () => {
    const testRenderer = renderer.create(<MyComponent />);
    const instance = testRenderer.getInstance();

    instance.handleChange({
      target: {
        value: 'myValue'
      }
    });

    expect(instance.state.input).toEqual('myValue');
  });
});
