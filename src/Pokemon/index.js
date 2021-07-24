import React from "react";

import './style.css';

function Pokemon({ pokemon: { name, types, averageWeight, averageHeight, sprites } }) {
  return (
    <div className="pokemon">
      <div>
        <p className="name">{name}</p>
        <p className="types">types: {types.join(' | ')}</p>
        <p>
          {`Average Height: ${averageHeight.value} ${averageHeight.measurementUnit}`}
        </p>
        <p>
          {`Average Weight: ${averageWeight.value} ${averageWeight.measurementUnit}`}
        </p>
      </div>
      <img src={sprites.animated_front_default} alt={`${name} sprite`} />
    </div>
  );
}

export default Pokemon;
