import React, { useState, useEffect } from "react";

import Pokemon from "../Pokemon";
import Button from "../Button";

import "./style.css";

function Pokedex({ pokemonList }) {
  const [filteredPokemon, setFilteredPokemon] = useState(pokemonList);
  const [currentPokemon, setCurrentPokemon] = useState(0);
  const [pokemonTypes, setPokemonTypes] = useState([]);
  const [buttonState, setButtonState] = useState(false);

  useEffect(() => {
    const typeTable = {};

    pokemonList.forEach((pokemon) => (typeTable[pokemon.type] = 1));

    setPokemonTypes(Object.keys(typeTable));
  }, [pokemonList]);

  function handleClick() {
    setCurrentPokemon((currentPokemon + 1) % filteredPokemon.length);
  }

  function filterPokemon(type) {
    if (type) {
      const filteredList = pokemonList.filter(
        (pokemon) => pokemon.type === type
      );

      setFilteredPokemon(filteredList);
      setButtonState(filteredList.length === 1);
      setCurrentPokemon(0);
    }
  }

  function clearFilters() {
    setFilteredPokemon(pokemonList);
    setButtonState(false);
    setCurrentPokemon(0);
  }

  return (
    <>
      <div className="pokedex">
        <Pokemon
          key={filteredPokemon[currentPokemon].id}
          pokemon={filteredPokemon[currentPokemon]}
        />
      </div>

      <div className="type-filters">
        {pokemonTypes.map((type, index) => (
          <Button key={index} filterPokemon={filterPokemon}>
            {type}
          </Button>
        ))}
        <button onClick={clearFilters}>Clear Filters</button>
      </div>

      <button onClick={handleClick} disabled={buttonState}>
        Next
      </button>
    </>
  );
}

export default Pokedex;
