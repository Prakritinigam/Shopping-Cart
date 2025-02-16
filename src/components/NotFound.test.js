import { render } from '@testing-library/react';
import NotFound from './NotFound';
import React from 'react';

it('renders', () => {
  const { asFragment } = render(<NotFound/>);
  expect(asFragment()).toMatchSnapshot();
});