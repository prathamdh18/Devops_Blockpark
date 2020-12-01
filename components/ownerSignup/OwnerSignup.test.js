import React from 'react';
import { render } from '@testing-library/react';
import OwnerSignup from './OwnerSignup';

test('OwnerSignup renders learn react link', () => {
  const { getByText } = render(<OwnerSignup />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
