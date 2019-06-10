import React from 'react';
import Dashboard from './Dashboard.js';
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
      podcastId: null
    }
  }

  loadPodcast = (podcastId) => {
    this.setState({ podcastId })
  }

  render() {
    return (
      <div className="app-container">
        <Dashboard loadPodcast={this.loadPodcast}/>
        <PlayerContext.Provider value={this.state}>
          <div id="podcast-component">
            <Podcast podcastId={this.state.podcastId}/>
          </div>
          <div id="podcast-feed-component">
            <PodcastFeed podcastId={this.state.podcastId}/>
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
