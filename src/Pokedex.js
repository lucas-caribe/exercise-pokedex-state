import React from 'react';
import Pokemon from './Pokemon';

class Pokedex extends React.Component {
    constructor() {
      super();

      this.state = {
        currentPoke: 0,
      }
    }
  render() {
    const { pokemonList } = this.props;

    return (
      <div className="pokedex">
        <Pokemon key={pokemonList[this.state.currentPoke].id} pokemon={pokemonList[this.state.currentPoke]} />
      </div>
    );
  }
}

export default Pokedex;
