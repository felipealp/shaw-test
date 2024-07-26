import React, { useState } from 'react';
import './style.scss';
import { handleFileUpload, fetchUsers } from '../../services/CsvService';
import InputSearch from '../InputSearch';
import InputUpload from '../InputUpload';
import CardList from '../CardList';

const Main: React.FC = () => {
  const [csvData, setCsvData] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    await handleFileUpload(event, setCsvData, setError);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);
    fetchUsers(term, setCsvData, setError);
    console.log(csvData)
  };

  return (
    <div className="main">
      <header className="main-header">
        <InputSearch value={searchTerm} onChange={handleSearchChange} />
        <InputUpload onChange={handleFileChange} />
        {error && <p className="error">{error}</p>}
        <CardList data={csvData} />
      </header>
    </div>
  );
};

export default Main;