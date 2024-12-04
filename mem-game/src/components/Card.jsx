import React from 'react';
import '../styles/Card.css';

export default function Card({ id, onClickCard, value, isSelected, active }) {
  const selectCard = () => {
    if (active) {
      onClickCard(id);
    }
  };

  return (
    <div
      className={`card ${isSelected ? 'selected' : ''} ${!active ? 'matched' : ''}`}
      onClick={selectCard}
    >
      <div className="card-inner">
        <div className="card-front"></div>
        <div className="card-back">{isSelected || !active ? value : ""}</div>
      </div>
    </div>
  );
}