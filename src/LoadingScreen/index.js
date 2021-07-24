import React from 'react';

import loadingGif from '../assets/loading.gif'

function LoadingScreen() {
  return (
    <div>
      <img
        src={loadingGif}
        alt="Pikachu"
        style={{ width: '20em' }}
      />
      <p>Loading...</p>
    </div>
  );
}

export default LoadingScreen;
