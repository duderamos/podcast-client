import gql from 'graphql-tag';

const GET_PODCAST = gql`
  {
    podcast(title: "Miçangas") {
      title
      description
      url
    }
  }
`;

const GET_EPISODES = gql`
  {
    episodes(limit: 5) {
      _id
      title
      url
      duration
      currentTime
    }
  }
`;

export { GET_PODCAST, GET_EPISODES };
