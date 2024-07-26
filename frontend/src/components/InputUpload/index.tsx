import React from 'react';
import { Button, Box } from '@mui/material';
import './style.scss';

interface InputUploadProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputUpload: React.FC<InputUploadProps> = ({ onChange }) => {
  return (
    <Box className="input-upload" display="flex" alignItems="center" justifyContent="center" p={2}>
      <input
        accept=".csv"
        style={{ display: 'none' }}
        id="input-upload-file"
        type="file"
        onChange={onChange}
      />
      <label 
        htmlFor="input-upload-file">
        <Button className="input-upload-button" variant="contained" color="primary" component="span">
          Upload CSV
        </Button>
      </label>
    </Box>
  );
};

export default InputUpload;