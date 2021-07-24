import React from "react";

import Pokedex from "./Pokedex";

import pokemonList from "./data";

import "./App.css";

function App() {
  return (
    <div className="App">
      <h1> Pokedex </h1>
      <Pokedex pokemonList={pokemonList} />
    </div>
  );
}

export default App;
