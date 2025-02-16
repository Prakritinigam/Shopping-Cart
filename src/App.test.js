import { render } from '@testing-library/react';
import App from './App';
import React from 'react';

it('renders', () => {
  const { asFragment } = render(<App/>);
  expect(asFragment()).toMatchSnapshot();
});

