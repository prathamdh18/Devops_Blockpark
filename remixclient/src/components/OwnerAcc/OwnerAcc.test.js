import React from 'react';
import { render } from '@testing-library/react';
import OwnerAcc from './OwnerAcc';

test('OwnerAcc renders learn react link', () => {
  const { getByText } = render(<OwnerAcc />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
