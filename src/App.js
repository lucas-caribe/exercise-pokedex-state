import React from 'react';

import Pokedex from './Pokedex';
import Button from './Button';

import pokemonList from './data';

import './App.css';

function App() {
  return (
    <div className="App">
      <h1> Pokedex </h1>
      <Pokedex pokemonList={pokemonList} />
      <Button />
    </div>
  );
}

export default App;
