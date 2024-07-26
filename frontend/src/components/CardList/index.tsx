import React from 'react';
import './style.scss';

interface CardListProps {
  data: any[];
}

const CardList: React.FC<CardListProps> = ({ data }) => {
  return (
    <div className="cards-container">
      {data.map((row, index) => (
        <div key={index} className="card">
          {Object.entries(row).map(([key, value]) => (
            <p key={key}>
              <strong>{key}:</strong> {value as React.ReactNode}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
};

export default CardList;