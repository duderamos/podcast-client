import React from 'react';
import ApolloClient from 'apollo-boost';
import ReactAudioPlayer from 'react-audio-player';
import { Mutation } from 'react-apollo';
import { SAVE_CURRENT_TIME } from '../graphql/Mutations';

class Episode extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { episode } = this.props;
    this.rap.audioEl.currentTime = episode.currentTime;
  }

  render() {
    const { episode } = this.props;
    return (
      <div className="episodeBox">
        <div className="title">{episode.title}</div>
        <Mutation mutation={SAVE_CURRENT_TIME}>
          {(saveCurrentTime, { data }) => (
            <ReactAudioPlayer
              src={episode.url}
              controls={true}
              onListen={(currentTime) => {
                saveCurrentTime({ variables: { episodeId: episode._id, currentTime: currentTime }});
              }}
              listenInterval={5000}
              ref={(element) => { this.rap = element}}
        />)}
      </Mutation>
      </div>
    );
  }
}

export default Episode;
