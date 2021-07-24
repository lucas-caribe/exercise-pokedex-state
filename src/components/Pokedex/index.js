import React, { useState, useEffect } from 'react';

import Pokemon from '../Pokemon';
import PokemonFilters from '../PokemonFilters';
import LoadingScreen from '../LoadingScreen';

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

    function getSprites(sprites) {
      return {
        back_default: sprites.back_default,
        back_shiny: sprites.back_shiny,
        front_default: sprites.front_default,
        front_shiny: sprites.front_shiny,
        animated_back_default:
          sprites.versions['generation-v']['black-white'].animated.back_default,
        animated_back_shiny:
          sprites.versions['generation-v']['black-white'].animated.back_shiny,
        animated_front_default:
          sprites.versions['generation-v']['black-white'].animated
            .front_default,
        animated_front_shiny:
          sprites.versions['generation-v']['black-white'].animated.front_shiny,
      };
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
          const filteredSprites = getSprites(sprites);

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
            sprites: filteredSprites,
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

    async function getPokemonTypes() {
      const response = await fetch(`${baseURL}/type/`);
      const data = await response.json();

      setPokemonTypes(data.results.map((type) => type.name));
    }

    getPokemonTypes();
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
