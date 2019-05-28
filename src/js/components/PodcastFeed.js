import React from 'react';
import Episode from './Episode';
import { Query } from 'react-apollo';
import { GET_EPISODES } from '../graphql/Queries';

class PodcastFeed extends React.Component {
  render() {
    return (
      <Query query={GET_EPISODES}>
        {({ loading, error, data }) => {
          if (loading) return 'Loading...';
          if (error) return `Something went wrong :( ${error.message}`;

          return (
            <div className="feed">
              {
                data.episodes.map((episode, index) => {
                  return <div key={index}><Episode episode={episode}/></div>
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
