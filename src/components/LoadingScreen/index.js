import React from 'react';

import loadingGif from '../../assets/loading.gif'

import './style.css';

function LoadingScreen() {
  return (
    <div className="loading-container">
      <img
        src={loadingGif}
        alt="Pikachu"
        style={{ width: '20em' }}
      />
      <p>
        Loading
        <span>.</span>
        <span>.</span>
        <span>.</span>
      </p>
    </div>
  );
}

export default LoadingScreen;
