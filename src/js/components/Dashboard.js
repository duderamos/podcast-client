import React from 'react';
import { Query } from 'react-apollo';
import { GET_PODCASTS } from '../graphql/Queries';
import { AuthContext } from '../contexts/AuthContext';

class Dashboard extends React.Component {
  static contextType = AuthContext;

  render() {
    const authContext = this.context;
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
              <p><a href="#" onClick={authContext.logout}>Logout</a></p>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default Dashboard;
