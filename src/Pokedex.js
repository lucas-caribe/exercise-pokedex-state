import React from 'react';
import Pokemon from './Pokemon';

class Pokedex extends React.Component {
  constructor(props) {
    super();

    this.state = {
      filteredPokemon: props.pokemonList,
      currentPoke: 0,
    };

    this.handlePsychic = this.handlePsychic.bind(this);
    this.handleFire = this.handleFire.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleFire() {
    const newPokemonList = this.props.pokemonList.filter(
      (pokemon) => pokemon.type === 'Fire',
    );

    this.setState({
      filteredPokemon: newPokemonList,
      currentPoke: 0,
    });
  }

  handlePsychic() {
    const newPokemonList = this.props.pokemonList.filter(
      (pokemon) => pokemon.type === 'Psychic',
    );

    this.setState({
      filteredPokemon: newPokemonList,
      currentPoke: 0,
    });
  }

  handleClick() {
    this.setState({
      filteredPokemon: this.state.filteredPokemon,
      currentPoke:
        (this.state.currentPoke + 1) % this.state.filteredPokemon.length,
    });
  }

  render() {
    return (
      <div className="pokedex">
        <Pokemon
          key={this.state.filteredPokemon[this.state.currentPoke].id}
          pokemon={this.state.filteredPokemon[this.state.currentPoke]}
        />
        <button onClick={this.handleFire}>Fire</button>
        <button onClick={this.handlePsychic}>Psychic</button>
        <button onClick={this.handleClick}>Next</button>
      </div>
    );
  }
}

export default Pokedex;
