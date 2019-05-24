import React from 'react';

export const PlayerContext = React.createContext({
  episode: null,
  loadEpisode: () => {},
});
