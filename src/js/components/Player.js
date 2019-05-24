import React from 'react';
import ApolloClient from 'apollo-boost';
import ReactAudioPlayer from 'react-audio-player';
import { Mutation } from 'react-apollo';
import { SAVE_CURRENT_TIME } from '../graphql/Mutations';

import './Player.css';

class Player extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.rap.audioEl.currentTime = this.props.episode.currentTime;
  }

  render() {
    const { episode } = this.props;
    return (
      <div className="player-box">
        <Mutation mutation={SAVE_CURRENT_TIME}>
          {(saveCurrentTime, { data }) => (
            <ReactAudioPlayer
              src={episode.url}
              controls={true}
              preload="none"
              onListen={(currentTime) => {
                saveCurrentTime({ variables: { episodeId: episode._id, currentTime: currentTime }});
              }}
              listenInterval={5000}
              ref={(element) => { this.rap = element }}
            />
          )}
        </Mutation>
    </div>
    );
  }
}

export default Player;
