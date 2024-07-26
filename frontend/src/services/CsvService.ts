import axios from 'axios';

const urlServer = 'http://localhost:3000'

export const handleFileUpload = async (
  event: React.ChangeEvent<HTMLInputElement>,
  setCsvData: React.Dispatch<React.SetStateAction<any[]>>,
  setError: React.Dispatch<React.SetStateAction<string | null>>
) => {
  const file = event.target.files?.[0];
  if (file) {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(`${urlServer}/api/files`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setCsvData(response.data.data);
      setError(null);
    } catch (error) {
      console.error(error);
      setError('Error loading CSV file.');
    }
  }
};

export const fetchUsers = async (
  searchTerm: string,
  setCsvData: React.Dispatch<React.SetStateAction<any[]>>,
  setError: React.Dispatch<React.SetStateAction<string | null>>
) => {
  try {
    const params = searchTerm ? { q: searchTerm } : {};
    const response = await axios.get(`${urlServer}/api/users`, { params });
    setCsvData(response.data.data);
    setError(null);
  } catch (error) {
    console.error(error);
    setError('Error when searching for users.');
  }
};