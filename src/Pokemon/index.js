import React from "react";

import './style.css';

function Pokemon({ pokemon: { name, type, averageWeight, image } }) {
  return (
    <div className="pokemon">
      <div>
        <p>{name}</p>
        <p>{type}</p>
        <p>
          {`Average weight: ${averageWeight.value} ${averageWeight.measurementUnit}`}
        </p>
      </div>
      <img src={image} alt={`${name} sprite`} />
    </div>
  );
}

export default Pokemon;
