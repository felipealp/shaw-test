import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import InputSearch from '../../components/InputSearch';

describe('InputSearch Component', () => {
  test('should render InputSearch component with initial value', () => {
    const mockOnChange = jest.fn();
    const initialValue = 'initial value';

    render(<InputSearch value={initialValue} onChange={mockOnChange} />);

    const inputElement = screen.getByLabelText(/search for any attribute/i);
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveValue(initialValue);
  });

  test('should call onChange when input value changes', () => {
    const mockOnChange = jest.fn();
    let value = 'initial value';

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      value = event.target.value;
      mockOnChange(event);
    };

    render(<InputSearch value={value} onChange={handleChange} />);

    const inputElement = screen.getByLabelText(/search for any attribute/i);
    fireEvent.change(inputElement, { target: { value: 'new value' } });

    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });
});