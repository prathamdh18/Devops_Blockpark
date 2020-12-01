import React from 'react';
import { render } from '@testing-library/react';
import OwnerLogin from './OwnerLogin';

test('OwnerLogin renders learn react link', () => {
  const { getByText } = render(<OwnerLogin />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
