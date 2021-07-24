import React from 'react';

import Button from '../Button/';

function PokemonFilters({ pokemonTypes, filterPokemon, clearFilters }) {
  return (
    <div className="type-filters">
      {pokemonTypes.map((type, index) => (
        <Button key={index} filterPokemon={filterPokemon}>
          {type}
        </Button>
      ))}
      <button onClick={clearFilters}>Clear Filters</button>
    </div>
  );
}

export default PokemonFilters;
