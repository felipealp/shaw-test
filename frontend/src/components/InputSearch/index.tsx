import React from 'react';
import './style.scss';
import { TextField } from '@mui/material';

interface InputSearchProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputSearch: React.FC<InputSearchProps> = ({ value, onChange }) => {
  return (
    <div className="input-search">
      <TextField
        className="input-search-textfield"
        data-testid="input-search"
        label="Search for any attribute"
        variant="outlined"
        fullWidth
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default InputSearch;