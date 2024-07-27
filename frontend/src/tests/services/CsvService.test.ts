import axios from 'axios';
import { fetchUsers, handleFileUpload } from '../../services/CsvService';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
const urlServer = 'http://localhost:3000'

describe('Csv Service', () => {
  let setCsvData: jest.Mock;
  let setError: jest.Mock;

  beforeEach(() => {
    setCsvData = jest.fn();
    setError = jest.fn();
    global.FormData = class {
      private data: Record<string, any> = {};
      append(key: string, value: any) {
        this.data[key] = value;
      }
      get(key: string) {
        return this.data[key];
      }
    } as any;
  });

  it('should fetch users successfully with search term', async () => {
    const data = { data: [{ id: 1, name: 'John Doe' }] };
    mockedAxios.get.mockResolvedValue({ data });

    await fetchUsers('John', setCsvData, setError);

    expect(mockedAxios.get).toHaveBeenCalledWith(`${urlServer}/api/users`, { params: { q: 'John' } });
    expect(setCsvData).toHaveBeenCalledWith(data.data);
    expect(setError).toHaveBeenCalledWith(null);
  });

  it('should fetch users successfully without search term', async () => {
    const data = { data: [{ id: 1, name: 'John Doe' }] };
    mockedAxios.get.mockResolvedValue({ data });

    await fetchUsers('', setCsvData, setError);

    expect(mockedAxios.get).toHaveBeenCalledWith(`${urlServer}/api/users`, { params: {} });
    expect(setCsvData).toHaveBeenCalledWith(data.data);
    expect(setError).toHaveBeenCalledWith(null);
  });

  it('should handle error when fetching users', async () => {
    mockedAxios.get.mockRejectedValue(new Error('Network Error'));

    await fetchUsers('John', setCsvData, setError);

    expect(mockedAxios.get).toHaveBeenCalledWith(`${urlServer}/api/users`, { params: { q: 'John' } });
    expect(setCsvData).not.toHaveBeenCalled();
    expect(setError).toHaveBeenCalledWith('Error when searching for users.');
  });

  it('should upload file and set CSV data successfully', async () => {
    const file = {
      name: 'test.csv',
      type: 'text/csv',
      size: 1024,
      slice: jest.fn(),
    } as unknown as File;
    const event = {
      target: { files: [file] },
      preventDefault: jest.fn(),
      stopPropagation: jest.fn(),
      persist: jest.fn(),
      nativeEvent: {} as Event,
      currentTarget: {} as HTMLInputElement,
      bubbles: false,
      cancelable: false,
      defaultPrevented: false,
      eventPhase: 0,
      isTrusted: true,
      timeStamp: Date.now(),
      type: 'change',
    } as unknown as React.ChangeEvent<HTMLInputElement>;
    const response = { data: { data: [{ id: 1, name: 'John Doe' }] } };

    mockedAxios.post.mockResolvedValue(response);

    await handleFileUpload(event, setCsvData, setError);

    expect(mockedAxios.post).toHaveBeenCalledWith(`${urlServer}/api/files`, expect.any(FormData), {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    expect(setCsvData).toHaveBeenCalledWith(response.data.data);
    expect(setError).toHaveBeenCalledWith(null);
  });

  it('should handle error when uploading file', async () => {
    const file = {
      name: 'test.csv',
      type: 'text/csv',
      size: 1024,
      slice: jest.fn(),
    } as unknown as File;
    const event = {
      target: { files: [file] },
      preventDefault: jest.fn(),
      stopPropagation: jest.fn(),
      persist: jest.fn(),
      nativeEvent: {} as Event,
      currentTarget: {} as HTMLInputElement,
      bubbles: false,
      cancelable: false,
      defaultPrevented: false,
      eventPhase: 0,
      isTrusted: true,
      timeStamp: Date.now(),
      type: 'change',
    } as unknown as React.ChangeEvent<HTMLInputElement>;

    mockedAxios.post.mockRejectedValue(new Error('Network Error'));

    await handleFileUpload(event, setCsvData, setError);

    expect(mockedAxios.post).toHaveBeenCalledWith(`${urlServer}/api/files`, expect.any(FormData), {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    expect(setCsvData).not.toHaveBeenCalled();
    expect(setError).toHaveBeenCalledWith('Error loading CSV file.');
  });

  it('should handle case when files is undefined', async () => {
    const event = {
      target: { files: undefined },
      preventDefault: jest.fn(),
      stopPropagation: jest.fn(),
      persist: jest.fn(),
      nativeEvent: {} as Event,
      currentTarget: {} as HTMLInputElement,
      bubbles: false,
      cancelable: false,
      defaultPrevented: false,
      eventPhase: 0,
      isTrusted: true,
      timeStamp: Date.now(),
      type: 'change',
    } as unknown as React.ChangeEvent<HTMLInputElement>;

    await handleFileUpload(event, setCsvData, setError);

    expect(mockedAxios.post).toHaveBeenCalled();
    expect(setCsvData).not.toHaveBeenCalled();
    expect(setError).not.toHaveBeenCalled();
  });

  it('should handle case when files is an empty array', async () => {
    const event = {
      target: { files: [] },
      preventDefault: jest.fn(),
      stopPropagation: jest.fn(),
      persist: jest.fn(),
      nativeEvent: {} as Event,
      currentTarget: {} as HTMLInputElement,
      bubbles: false,
      cancelable: false,
      defaultPrevented: false,
      eventPhase: 0,
      isTrusted: true,
      timeStamp: Date.now(),
      type: 'change',
    } as unknown as React.ChangeEvent<HTMLInputElement>;

    await handleFileUpload(event, setCsvData, setError);

    expect(mockedAxios.post).toHaveBeenCalled();
    expect(setCsvData).not.toHaveBeenCalled();
    expect(setError).not.toHaveBeenCalled();
  });

});