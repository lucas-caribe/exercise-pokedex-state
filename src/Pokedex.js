import React from 'react';
import pokemonList from './data';
import Pokemon from './Pokemon';

class Pokedex extends React.Component {
    constructor() {
      super();

      this.state = {
        currentPoke: 0,
      }
      this.handleClick = this.handleClick.bind(this)
    }

    handleClick () {
      const nextPoke = this.state.currentPoke === pokemonList.length - 1 ? 0 : this.state.currentPoke + 1;
      this.setState({
        currentPoke: nextPoke,
      })
    }

  render() {
    const { pokemonList } = this.props;

    return (
      <div className="pokedex">
        <Pokemon key={pokemonList[this.state.currentPoke].id} pokemon={pokemonList[this.state.currentPoke]} />
        <button onClick= { this.handleClick } >Next</button>
      </div>
    );
  }
}

export default Pokedex;
