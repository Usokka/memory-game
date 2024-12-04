import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Menu.css';

export default function Menu() {
  const [playerName, setPlayerName] = useState('');
  const navigate = useNavigate();

  const startGame = (gridSize) => {
    if (playerName.trim()) {
      navigate(`/game/${gridSize}`, { state: { playerName } });
    } else {
      alert('Please enter your name!');
    }
  };

  return (
    <div className="menu-container">
      <h1 className="title">Memory Game</h1>
      <input
        type="text"
        placeholder="Enter Your Name"
        className="player-name"
        maxLength={15}
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
      />
      <button className="menu-button" onClick={() => startGame(4)}>4x4</button>
      <button className="menu-button" onClick={() => startGame(6)}>6x6</button>
    </div>
  );
}