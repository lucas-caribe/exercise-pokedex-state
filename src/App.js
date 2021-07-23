import React from 'react';

import Pokedex from './Pokedex';
import Button from './Button';

import pokemons from './data';

import './App.css';

function App() {
  return (
    <div className="App">
      <h1> Pokedex </h1>
      <Pokedex pokemons={pokemons} />
      <Button />
    </div>
  );
}

export default App;
