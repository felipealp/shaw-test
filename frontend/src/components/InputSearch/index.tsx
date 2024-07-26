import React from 'react';
import './style.scss';

interface InputSearchProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputSearch: React.FC<InputSearchProps> = ({ value, onChange }) => {
  return (
    <div className="input-search">
      <input
        type="text"
        placeholder="Pesquisar..."
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default InputSearch;