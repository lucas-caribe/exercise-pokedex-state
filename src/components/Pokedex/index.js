import React, { useState, useEffect } from 'react';

import Pokemon from '../Pokemon';
import PokemonFilters from '../PokemonFilters';
import LoadingScreen from '../LoadingScreen';

import typeColors from '../../typeColors';

import './style.css';

const baseURL = 'https://pokeapi.co/api/v2';

function Pokedex() {
  const [pokemonList, setPokemonList] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [pokemonTypes, setPokemonTypes] = useState([]);

  useEffect(() => {
    async function getAbilityInfo(ability) {
      try {
        const response = await fetch(ability);
        const data = await response.json();

        const { name, effect_entries } = data;

        return { name, effect: effect_entries[0].short_effect };
      } catch (error) {
        console.log(error);
      }
    }

    async function fetchPokemonApi() {
      const fullList = [];

      for (let i = 1; i <= 151; i++) {
        try {
          const response = await fetch(`${baseURL}/pokemon/${i}`);
          const data = await response.json();

          const { id, name, height, weight, sprites, types, stats } = data;
          const ability = await getAbilityInfo(data.abilities[0].ability.url);
          const typeNames = types.map((type) => type.type.name);

          fullList.push({
            id,
            name,
            averageWeight: {
              value: weight / 10,
              measurementUnit: 'kg',
            },
            averageHeight: {
              value: height / 10,
              measurementUnit: 'm',
            },
            sprite: sprites.other['official-artwork'].front_default,
            types: typeNames,
            ability,
            hp: stats[0].base_stat,
          });
        } catch (error) {
          console.log(error);
        }
      }

      setPokemonList(fullList);
      setFilteredPokemon(fullList);
    }

    setPokemonTypes(Object.keys(typeColors));
    fetchPokemonApi();
  }, []);

  function filterPokemon(type) {
    if (type) {
      const filteredList = pokemonList.filter((pokemon) =>
        pokemon.types.includes(type),
      );

      setFilteredPokemon(filteredList);
    }
  }

  function clearFilters() {
    setFilteredPokemon(pokemonList);
  }

  if (!pokemonList.length) {
    return (
      <div className="main-content">
        <LoadingScreen />
      </div>
    );
  }

  return (
    <div className="main-content">
      <PokemonFilters
        pokemonTypes={pokemonTypes}
        filterPokemon={filterPokemon}
        clearFilters={clearFilters}
      />

      <div className="pokedex">
        {filteredPokemon.length > 0 &&
          filteredPokemon.map((pokemon) => (
            <Pokemon key={pokemon.id} pokemon={pokemon} />
          ))}
      </div>
    </div>
  );
}

export default Pokedex;
