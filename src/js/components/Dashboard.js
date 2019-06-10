import React from 'react';
import { Query } from 'react-apollo';
import { GET_PODCASTS } from '../graphql/Queries';

class Dashboard extends React.Component {
  render() {
    const { loadPodcast } = this.props;
    return (
      <Query query={GET_PODCASTS}>
        {({ loading, error, data }) => {
          if (loading) return 'Loading...';
          if (error) return `Something went wrong :( ${error.message}`;

          return (
            <div>
            {
              data.podcasts.map((podcast, index) => {
                return (
                  <img
                    onClick={() => loadPodcast(podcast._id)}
                    key={index}
                    style={{width: '60px'}}
                    src={podcast.imageUrl}
                  />
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

export default Dashboard;
