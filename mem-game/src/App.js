import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Menu from './components/Menu';
import Game from './components/Game';
import EndScreen from './components/EndScreen';
import './styles/App.css';

export default function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Menu />} />
          <Route path="/game/:gridSize" element={<Game />} />
          <Route path="/end" element={<EndScreen />} />
        </Routes>
      </div>
    </Router>
  );
}