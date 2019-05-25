import React from 'react';
import ApolloClient from 'apollo-boost';
import ReactAudioPlayer from 'react-audio-player';
import { Mutation } from 'react-apollo';
import { SAVE_CURRENT_TIME } from '../graphql/Mutations';

import './Player.css';

class Player extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      play: false,
      playIcon: "play_circle_filled",
      played: 0
    }
  }

  componentDidMount() {
    this.audio.currentTime = this.props.episode.currentTime;
  }

  togglePlay = () => {
    if (this.state.play) {
      this.setState({
        play: false,
        playIcon: "play_circle_filled"
      });
      this.audio.pause();
    } else {
      this.setState({
        play: true,
        playIcon: "pause_circle_filled"
      });
      this.audio.play();
    }
  }

  render() {
    const { episode } = this.props;
    return (
      <div className="player-box">
        <div>
          <i className="material-icons player-icon">replay_10</i>
          <i className="material-icons player-icon" onClick={this.togglePlay}>{this.state.playIcon}</i>
          <i className="material-icons player-icon">forward_10</i>
          {episode.title}
          {this.state.played}
        </div>
        <Mutation mutation={SAVE_CURRENT_TIME}>
          {(saveCurrentTime, { data }) => (
            <audio
              src={episode.url}
              preload="metadata"
              onTimeUpdate={() => {
                if ((Math.round(this.audio.currentTime) % 5) == 0) {
                  saveCurrentTime({ variables: { episodeId: episode._id, currentTime: this.audio.currentTime }});
                }
                this.setState({ played: this.audio.currentTime });
              }}
              ref={(audio) => { this.audio = audio }}
            />
            )}
          </Mutation>
        </div>
    );
  }
}

export default Player;
