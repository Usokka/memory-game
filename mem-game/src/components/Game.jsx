import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { createArray } from '../utils/cardsArray';
import Card from './Card';
import '../styles/Game.css';

export default function Game() {
  const { gridSize } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [numCards, setNumCards] = useState(0);
  const [moves, setMoves] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [isRevealing, setIsRevealing] = useState(true);
  const [gameCompleted, setGameCompleted] = useState(false);

  // Initialize cards and handle reveal timer
  useEffect(() => {
    if (!location.state?.playerName) {
      navigate('/');
      return;
    }
    const initialCards = createArray(parseInt(gridSize));
    setCards(initialCards.map(card => ({ ...card, selected: true })));

    const revealDuration = 3000;
    const timer = setTimeout(() => {
      setCards(initialCards.map(card => ({ ...card, selected: false })));
      setIsRevealing(false);
    }, revealDuration);

    return () => clearTimeout(timer);
  }, [gridSize, navigate, location.state]);

//Handle card selection
  const selectCard = (id) => {

    const selected = cards.filter(card => card.selected && card.active).length;

    if (isFlipping || isRevealing || gameCompleted || selected === 2) return;

    setCards(prevCards => {
      const updatedCards = prevCards.map(card => {
        if (card.id === id && card.active) {
          return { ...card, selected: !card.selected };
        }
        return card;
      });

      const selectedCards = updatedCards.filter(card => card.selected && card.active);
      if (selectedCards.length === 2) {
        setIsFlipping(true);
        setNumCards(2);
      }
      
      setMoves(moves + 1);
      return updatedCards;
    });
  };

  useEffect(() => {
    if (numCards === 2) {
      const selectedCards = cards.filter(card => card.selected);

      if (selectedCards.length === 2) {
        if (selectedCards[0].value === selectedCards[1].value) {
          setCards(prevCards =>
            prevCards.map(card => {
              if (card.id === selectedCards[0].id || card.id === selectedCards[1].id) {
                return { ...card, selected: false, active: false };
              }
              return card;
            })
          );
        } else {
          setTimeout(() => {
            setCards(prevCards =>
              prevCards.map(card => {
                if (card.id === selectedCards[0].id || card.id === selectedCards[1].id) {
                  return { ...card, selected: false };
                }
                return card;
              })
            );
          }, 1000);
        }
        setIsFlipping(false);
        setNumCards(0);
      }
    }
  }, [numCards, cards]);

  // Check for game completion
  useEffect(() => {
    if (cards.length > 0 && cards.every(card => !card.active)) {
      setTimeout(() => {
        setGameCompleted(true);
        navigate('/end', {
          state: {
            playerName: location.state.playerName,
            moves: moves,
            gridSize: gridSize,
          },
        });
      }, 1000);
    }
  }, [cards, navigate, location.state, moves, gridSize]);

  if (!location.state?.playerName) {
    return null;
  }

  if (gameCompleted) {
    return (
      <div className="game-completed">
        <div className="game-completed-message">
          <h2>Congratulations, {location.state.playerName}!</h2>
          <p>You completed the {gridSize}x{gridSize} game in {moves} moves.</p>
          <p>Redirecting to the end screen...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="game-container">
      <h2>Player: {location.state.playerName}</h2>
      <h3>Moves: {moves}</h3>
      {isRevealing && <p>Memorize the cards!</p>}
      <div className={`game-grid grid-${gridSize}`}>
        {cards.map((card) => (
          <Card
            key={card.id}
            id={card.id}
            isSelected={card.selected}
            value={card.value}
            active={card.active}
            onClickCard={selectCard}
            isRevealing={isRevealing}
          />
        ))}
      </div>
    </div>
  );
}
