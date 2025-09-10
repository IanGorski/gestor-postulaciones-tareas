import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { test, expect } from 'vitest';
import App from '../App';

test('renderiza el título principal', () => {
  render(<App />);
  expect(screen.getByText(/Postulaciones/i)).toBeInTheDocument();
});
