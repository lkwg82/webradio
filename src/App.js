import React from 'react';
import './App.css';
import Player from './components/radio/player.js';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Player />
      </header>
    </div>
  );
}

export default App;
