
import { render, screen } from '@testing-library/react';
import AnimatedCube from './AnimatedCube.jsx';

jest.mock('@react-three/fiber', () => ({
  Canvas: () => <div data-testid="mock-canvas">Mock Canvas</div>,
  useFrame: () => {},
}));

describe('AnimatedCube', () => {
  it('renderiza el componente sin errores', () => {
    render(<AnimatedCube />);
    expect(screen.getByTestId('mock-canvas')).toBeInTheDocument();
  });
});
