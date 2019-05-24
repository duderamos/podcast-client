import React from 'react';
import Player from './Player';
import { PlayerContext } from '../contexts/PlayerContext';

class Episode extends React.Component {
  render() {
    const { episode } = this.props;
    return (
      <PlayerContext.Consumer>
        {({ _, loadEpisode }) => (
          <div className="episodeBox">
            <div className="title">{episode.title}</div>
            <button
              onClick={() => loadEpisode(episode)}>Play
            </button>
          </div>
        )}
      </PlayerContext.Consumer>
    );
  }
}

export default Episode;
