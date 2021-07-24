import React from 'react';

import Pokedex from './components/Pokedex/';
import Header from './components/Header/';

import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Pokedex />
    </div>
  );
}

export default App;
