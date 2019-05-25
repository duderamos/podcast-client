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
            {episode.title}
            <button
              className="material-icons"
              onClick={() => loadEpisode(episode)}>play_circle_outline
            </button>
          </div>
        )}
      </PlayerContext.Consumer>
    );
  }
}

export default Episode;
