import React from 'react';
import { render } from '@testing-library/react';
import Receipt from './Receipt';

test('Receipt renders learn react link', () => {
  const { getByText } = render(<Receipt />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
