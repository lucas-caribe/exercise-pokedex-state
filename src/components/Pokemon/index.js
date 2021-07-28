import React from 'react';

import TypeIcon from '../TypeIcon';

import typeColors from '../../typeColors';

import './style.css';

// attack,
// defense,
// specialAttack,
// specialDefense,
// speed,

function Pokemon({ pokemon }) {
  const { name, types, averageWeight, averageHeight, sprite, hp } = pokemon;

  const typeColor = typeColors[types[0]];

  const cardStyle = {
    background:
      typeof typeColor === 'object'
        ? `linear-gradient(to bottom, ${typeColor[0]}, ${typeColor[0]} 50%, ${typeColor[1]} 50%)`
        : typeColor,
  };

  const cardBodyStyle = {
    background: `no-repeat #fff linear-gradient(to bottom, ${
      typeof typeColor === 'object' ? typeColor[0] : typeColor
    } 5%, #FFFFFF) top`,
  };

  function handleMouseMove(event) {
    const { clientX, clientY } = event;
    const { target } = event;
    const domRect = target.getBoundingClientRect();
    const x = Math.max(0, clientX - Math.round(domRect.left));
    const y = Math.max(0, clientY - Math.round(domRect.top));
    const width = domRect.width;
    const height = domRect.height;

    const posX = width / 2 - x;
    const posY = height / 2 - y;

    const hypotenuseCursor = Math.sqrt(Math.pow(posX, 2) + Math.pow(posY, 2));
    const hypotenuseMax = Math.sqrt(
      Math.pow(width / 2, 2) + Math.pow(height / 2, 2),
    );

    const ratio = hypotenuseCursor / hypotenuseMax;

    if (target.classList.contains('card-cover')) {
      const pokeCard = target.nextElementSibling;
      const highlight = pokeCard.children[0];

      pokeCard.style.transform = `rotate3d(${posY / hypotenuseCursor}, ${
        -posX / hypotenuseCursor
      }, 0, ${ratio * 20}deg)`;
      pokeCard.style.filter = `brightness(${1.1 - y / 6 / height})`;

      highlight.style.transform = `translateX(${
        posX * ratio/2 * 0.75
      }px) translateY(${posY * ratio/2}px)`;
    }
  }

  function handleMouseLeave({ target }) {
    const pokeCard = target.nextElementSibling;
    const highlight = pokeCard.children[0];

    if (pokeCard) {
      pokeCard.style.transform = '';
      pokeCard.style.filter = '';

      highlight.style.transform = '';
    }
  }

  return (
    <div
      className="card-wrapper"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="card-cover" />
      <div className="card" style={cardStyle}>
        <div className="highlight" />
        <div className="card-body" style={cardBodyStyle}>
          <div className="card-header">
            <p className="poke-name">{name}</p>
            <p className="poke-hp">
              HP <span>{hp}</span>
            </p>
            <div className="types">
              {types.map((type) => (
                <TypeIcon key={type} type={type} />
              ))}
            </div>
          </div>

          <div className="card-main-info">
            <img className="poke-image" src={sprite} alt={name} />
            <p className="poke-types">
              {types.length === 1
                ? `Type: ${types[0]}`
                : `Types: ${types.join(' | ')}`}
            </p>
            <p>
              Average Height: {averageHeight.value}{' '}
              {averageHeight.measurementUnit} | Average Weight:{' '}
              {averageWeight.value} {averageWeight.measurementUnit}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pokemon;
