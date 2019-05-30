import gql from 'graphql-tag';

const GET_PODCAST = gql`
  {
    podcast(title: "Spin de Notícias | Deviante") {
      title
      description
      url
      imageUrl
      imageTitle
    }
  }
`;

const GET_EPISODES = gql`
  {
    episodes(limit: 5) {
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

export { GET_PODCAST, GET_EPISODES };
