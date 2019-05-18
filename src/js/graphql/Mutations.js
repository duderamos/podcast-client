import gql from 'graphql-tag';

const SAVE_CURRENT_TIME = gql`
  mutation SaveCurrentTime(
    $episodeId: String!,
    $currentTime: Float!)
    {
      saveCurrentTime(
        episodeId: $episodeId,
        currentTime: $currentTime) {
          currentTime
        }
    }
`;

export { SAVE_CURRENT_TIME };
