import React from 'react';
import './style.scss';

const Main: React.FC = () => {
  return (
    <div className="Main">
      <header className="Main-header">
        <p>
          Edit and save to reload.
        </p>
        <a
          className="Main-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Redirecionar
        </a>
      </header>
    </div>
  );
};

export default Main;