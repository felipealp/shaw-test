import React, { useState, useEffect } from 'react';
import { Container, Box, Divider, Typography, Snackbar, Alert } from '@mui/material';
import InputSearch from '../InputSearch';
import InputUpload from '../InputUpload';
import CardList from '../CardList';
import { handleFileUpload, fetchUsers } from '../../services/CsvService';
import './style.scss';

const MainComponent: React.FC = () => {
  const [csvData, setCsvData] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      await handleFileUpload(event, setCsvData, setError);
      setSuccess('File uploaded successfully!');
      setError(null);
      setOpenSnackbar(true);
    } catch (err) {
      setError('Failed to upload file.');
      setSuccess(null);
      setOpenSnackbar(true);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);
    fetchUsers(term, setCsvData, setError);
    console.log(csvData);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  useEffect(() => {
    fetchUsers('', setCsvData, setError);
  }, []);

  return (
    <div className='main'>
      <Container>
        <Box my={4}>
          <div className='main-header'>
            <InputSearch
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <InputUpload onChange={handleFileChange}/>
          </div>
          
          <Divider sx={{ my: 2 }} />
          
          {error && (
            <Typography color="error" variant="body1" gutterBottom>
              {error}
            </Typography>
          )}

          <CardList data={csvData} />

          <Snackbar
            open={openSnackbar}
            autoHideDuration={2000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            sx={{ width: '50%' }}
          >
            {success ? (
              <Alert onClose={handleCloseSnackbar} variant="filled" severity="success" sx={{ width: '100%' }}>
                {success}
              </Alert>
            ) : (
              <Alert onClose={handleCloseSnackbar} variant="filled" severity="error" sx={{ width: '100%' }}>
                {error}
              </Alert>
            )}
          </Snackbar>
        </Box>
      </Container>
    </div>
  );
};

export default MainComponent;