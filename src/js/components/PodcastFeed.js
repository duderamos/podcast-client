import React from 'react';
import Episode from './Episode';
import { Query } from 'react-apollo';
import { GET_EPISODES } from '../graphql/Queries';

class PodcastFeed extends React.Component {
  render() {
    const { podcastId } = this.props;
    return (
      <Query query={GET_EPISODES} variables={{ podcastId: podcastId }}>
        {({ loading, error, data }) => {
          if (loading) return 'Loading...';
          if (error) return `Something went wrong :( ${error.message}`;

          return (
            <div className="podcast-feed">
              {
                data.episodes.map((episode, index) => {
                  return <div className="feed-item" key={index}><Episode episode={episode}/></div>
                })
              }
            </div>
          );
        }}
      </Query>
    );
  }
}

export default PodcastFeed;
