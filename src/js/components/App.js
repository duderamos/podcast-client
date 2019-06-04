import React from 'react';
import Podcast from './Podcast.js';
import PodcastFeed from './PodcastFeed.js';
import Player from './Player.js';
import { PlayerContext } from '../contexts/PlayerContext';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.loadEpisode = (episode) => {
      this.setState(state => ({
        playerEpisode: episode
      }));
    }

    this.state = {
      playerEpisode: null,
      loadEpisode: this.loadEpisode,
    }
  }

  render() {
    return (
      <div className="app-container">
        <PlayerContext.Provider value={this.state}>
          <div id="podcast-component">
            <Podcast/>
          </div>
          <div id="podcast-feed-component">
            <PodcastFeed/>
          </div>
          <div id="podcast-player-component">
            { this.state.playerEpisode &&
            <Player episode={this.state.playerEpisode}/>
            }
          </div>
        </PlayerContext.Provider>
      </div>
    )
  }
}

export default App;
