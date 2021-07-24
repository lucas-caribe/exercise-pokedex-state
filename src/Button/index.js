import React from "react";

function Button({ children, filterPokemon }) {
  return <button onClick={() => filterPokemon(children)}>{children}</button>;
}

export default Button;
