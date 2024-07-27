import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';

jest.mock('../components/Main', () => () => <div data-testid="main-component" />);

describe('App Component', () => {
  test('should render Main component', () => {
    render(<App />);
    const mainComponent = screen.getByTestId('main-component');
    expect(mainComponent).toBeInTheDocument();
  });
});