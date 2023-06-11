import React from 'react';
import renderer from 'react-test-renderer';
import App from '../App';


test('App snapshot test', () => {
    const snap = renderer.create(<App />).toJSON();
    expect(snap).toMatchSnapshot();
});
