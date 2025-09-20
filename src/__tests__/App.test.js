
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';

describe('App', () => {
  it('renderiza el título principal', () => {
    render(<App />);
    expect(screen.getByText(/Postulaciones/i)).toBeInTheDocument();
  });
});
