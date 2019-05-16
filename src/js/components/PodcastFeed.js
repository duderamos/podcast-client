import React from 'react';
import { Query } from 'react-apollo';
import ReactAudioPlayer from 'react-audio-player';
import { GET_EPISODES } from '../graphql/Queries';

class PodcastFeed extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Query query={GET_EPISODES}>
        {({ loading, error, data }) => {
          if (loading) return 'Loading...';
          if (error) return `Something went wrong :( ${error.message}`;

          return (
            <div>
              {
                data.episodes.map((episode, index) => {
                  return (
                    <div key={index}>
                      <div>{episode.title}</div>
                      <ReactAudioPlayer
                        src={episode.url}
                        controls={true}
                      />
                    </div>
                  );
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
