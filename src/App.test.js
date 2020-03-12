import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import Index from './EditorV1/Editor';

test('renders learn react link', () => {
  // const { getByText } = render(<App />);
  const { getByText } = render(<App />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
