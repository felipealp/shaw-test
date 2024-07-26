import React from 'react';
import './style.scss';

interface InputUploadProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputUpload: React.FC<InputUploadProps> = ({ onChange }) => {
  return (
    <div className="input-upload">
      <input type="file" accept=".csv" onChange={onChange} />
    </div>
  );
};

export default InputUpload;