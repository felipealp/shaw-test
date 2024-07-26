import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import Main from '../../components/Main';
import { handleFileUpload, fetchUsers } from '../../services/CsvService';

jest.mock('../../services/CsvService', () => ({
  handleFileUpload: jest.fn(),
  fetchUsers: jest.fn(),
}));

describe('Main Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should render MainComponent with InputSearch, InputUpload, and error message', () => {
    render(<Main />);

    const inputSearchElement = screen.getByRole('textbox');
    expect(inputSearchElement).toBeInTheDocument();

    const inputUploadElement = screen.getByTestId('input-upload-file');
    expect(inputUploadElement).toBeInTheDocument();
  });

  test('should handle file upload successfully', async () => {
    (handleFileUpload as jest.Mock).mockResolvedValueOnce([]);

    render(<Main />);

    const inputElement = screen.getByTestId('input-upload-file');
    const file = new File(['dummy content'], 'example.csv', { type: 'text/csv' });

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      fireEvent.change(inputElement, { target: { files: [file] } });
    });

    expect(handleFileUpload).toHaveBeenCalledTimes(1);
  });

  test('should handle file upload failure', async () => {
    (handleFileUpload as jest.Mock).mockRejectedValueOnce(new Error('Failed to upload file'));

    render(<Main />);

    const inputElement = screen.getByTestId('input-upload-file');
    const file = new File(['dummy content'], 'example.csv', { type: 'text/csv' });

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      fireEvent.change(inputElement, { target: { files: [file] } });
    });
  
    expect(handleFileUpload).toHaveBeenCalledTimes(1);
  });

  test('should call fetchUsers when search input changes', async () => {
    render(<Main />);

    const searchInput = screen.getByTestId('input-search') as HTMLInputElement;
    // eslint-disable-next-line testing-library/no-node-access
    const inputContent = searchInput.querySelector('input') as HTMLInputElement;

    expect(inputContent).toBeInTheDocument();

    const searchTerm = 'test search';

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      inputContent.setAttribute('value', searchTerm);
      fireEvent.change(inputContent);
    });

    expect(fetchUsers).toHaveBeenCalledWith(searchTerm, expect.any(Function), expect.any(Function));
  });
});