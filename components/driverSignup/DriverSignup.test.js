import React from 'react';
import { render } from '@testing-library/react';
import DriverSignup from './DriverSignup';

test('DriverSignup renders learn react link', () => {
  const { getByText } = render(<DriverSignup />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
