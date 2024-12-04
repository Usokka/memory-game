import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/EndScreen.css';

export default function EndScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const { playerName, moves, gridSize } = location.state || {};

  const playAgain = () => {
    navigate(`/game/${gridSize}`, { state: { playerName } });
  };

  const backToMenu = () => {
    navigate('/');
  };

  if (!playerName) {
    navigate('/');
    return null;
  }

  return (
    <div className="end-screen">
      <h1>Congratulations, {playerName}!</h1>
      <p>You completed the {gridSize}x{gridSize} game in {moves} moves.</p>
      <div className="button-container">
        <button className="play-again-button" onClick={playAgain}>
          Play Again
        </button>
        <button className="menu-button" onClick={backToMenu}>
          Back to Menu
        </button>
      </div>
    </div>
  );
}