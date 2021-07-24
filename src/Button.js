import React from 'react';

const Button = ({ children, filterPokemon }) => {
  return <button onClick={() => filterPokemon(children)}>{children}</button>
}

export default Button;
