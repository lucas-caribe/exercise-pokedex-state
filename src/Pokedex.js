import React from "react";

import Pokemon from "./Pokemon";
import Button from "./Button";

export default class Pokedex extends React.Component {
  constructor(props) {
    super();

    this.state = {
      filteredPokemon: props.pokemonList,
      currentPokemon: 0,
    };

    this.handleClick = this.handleClick.bind(this);
    this.filterPokemon = this.filterPokemon.bind(this);
    this.clearFilters = this.clearFilters.bind(this);
  }

  handleClick() {
    let nextPokemon = this.state.currentPokemon + 1;

    if (nextPokemon >= this.state.filteredPokemon.length) nextPokemon = 0;

    this.setState({
      filteredPokemon: this.state.filteredPokemon,
      currentPokemon: nextPokemon,
    });
  }

  filterPokemon(type) {
    if (type) {
      this.setState({
        filteredPokemon: this.props.pokemonList.filter(
          (pokemon) => pokemon.type === type
        ),
        currentPokemon: 0,
      });
    }
  }

  clearFilters() {
    this.setState({
      filteredPokemon: this.props.pokemonList,
      currentPokemon: 0,
    });
  }

  render() {
    return (
      <>
        <div className="pokedex">
          <Pokemon
            key={this.state.filteredPokemon[this.state.currentPokemon].id}
            pokemon={this.state.filteredPokemon[this.state.currentPokemon]}
          />
        </div>

        <div className="type-filters">
          <Button filterPokemon={this.filterPokemon}>Fire</Button>
          <Button filterPokemon={this.filterPokemon}>Psychic</Button>
          <button onClick={this.clearFilters}>Clear Filters</button>
        </div>

        <button onClick={this.handleClick}>Next</button>
      </>
    );
  }
}
