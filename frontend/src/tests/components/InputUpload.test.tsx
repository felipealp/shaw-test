import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import InputUpload from '../../components/InputUpload';

describe('InputUpload Component', () => {
  test('should render InputUpload component', () => {
    const mockOnChange = jest.fn();

    render(<InputUpload onChange={mockOnChange} />);

    const inputElement = screen.getByTestId('input-upload-file');
    expect(inputElement).toBeInTheDocument();
  });

  test('should call onChange when a file is selected', () => {
    const mockOnChange = jest.fn();

    render(<InputUpload onChange={mockOnChange} />);

    const inputElement = screen.getByTestId('input-upload-file');
    const file = new File(['dummy content'], 'example.csv', { type: 'text/csv' });

    fireEvent.change(inputElement, { target: { files: [file] } });

    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });
});