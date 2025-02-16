import { render } from '@testing-library/react';
import OrderPlaced from './OrderPlaced';
import React from 'react';

it('renders', () => {
  const { asFragment } = render(<OrderPlaced/>);
  expect(asFragment()).toMatchSnapshot();
});