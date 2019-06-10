import gql from 'graphql-tag';

const GET_PODCAST = gql`
  query podcast($id: String!) {
    podcast(_id: $id) {
      title
      description
      url
      imageUrl
      imageTitle
    }
  }
`;

const GET_PODCASTS = gql`
  {
    podcasts {
      _id
      title
      imageUrl
    }
  }
`;

const GET_EPISODES = gql`
  query episodes($podcastId: String!) {
    episodes(podcastId: $podcastId) {
      _id
      title
      url
      currentTime
      length
      link
      pubDate
      categories
      imageUrl
    }
  }
`;

export { GET_PODCAST, GET_PODCASTS, GET_EPISODES };
