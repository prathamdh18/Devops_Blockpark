import React from 'react';
import { render } from '@testing-library/react';
import DriverAcc from './DriverAcc';

test('DriverAcc renders learn react link', () => {
  const { getByText } = render(<DriverAcc />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
