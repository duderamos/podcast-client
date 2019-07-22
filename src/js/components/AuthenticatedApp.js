import React from 'react';
import Dashboard from './Dashboard.js';
import Podcast from './Podcast.js';
import PodcastFeed from './PodcastFeed.js';
import Player from './Player.js';
import { PlayerContext } from '../contexts/PlayerContext';
import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

const httpLink = new HttpLink({ uri: 'http://localhost:3000/api' });

const authLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem('token');

  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : ''
    }
  });

  return forward(operation);
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

class AuthenticatedApp extends React.Component {
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
        <ApolloProvider client={client}>
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
        </ApolloProvider>
      </div>
    )
  }
}

export default AuthenticatedApp;
