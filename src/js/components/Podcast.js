import React from 'react';
import { Query } from 'react-apollo';
import { GET_PODCAST } from '../graphql/Queries';

class Podcast extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rss: null,
    }
  }

  render() {
    return (
      <Query query={GET_PODCAST}>
        {({ loading, error, data }) => {
          if (loading) return 'Loading...';
          if (error) return `Something went wrong :( ${error.message}`;

          return (
            <div className="title">
              <h1>{data.podcast.title}</h1>
              <p className="description">
                {data.podcast.description}
              </p>
              <abbr>
                <a href={data.podcast.url}>{data.podcast.url}</a>
              </abbr>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default Podcast;
