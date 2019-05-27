import React from 'react';
import ApolloClient from 'apollo-boost';
import { Mutation } from 'react-apollo';
import { SAVE_CURRENT_TIME } from '../graphql/Mutations';

import './Player.css';

class Player extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      play: false,
      playIcon: "play_circle_filled",
      played: 0,
      playedAngle: ""
    }
  }

  componentDidMount() {
    this.audio.currentTime = this.props.episode.currentTime;
    this.updatePlayedAngle();
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

  updatePlayedAngle = () => {
    const pi = Math.PI;
    let angle = (this.audio.currentTime * 360) / this.audio.duration;
    if (Number.isNaN(this.audio.duration)) return;
    let r = ( angle * pi / 180 )
    let x = Math.sin( r ) * 25
    let y = Math.cos( r ) * - 25
    let mid = ( angle > 180 ) ? 1 : 0
    let anim = `M 0 0 v -25 A 25 25 1 ${mid} 1 ${x} ${y} z`;
    this.setState({ playedAngle: anim });
  }

  render() {
    const { episode } = this.props;
    return (
      <div className="player-box">
        <div>
          <div style={{display: "inline", position: "relative", left: "0px"}}>
            <svg
              style={{verticalAlign: "middle"}}
              width="50" height="50"
            >
              <path
                id="progress-circle"
                transform="translate(25, 25) scale(.95)"
                d={this.state.playedAngle}
              />
              <circle transform="translate(25, 25)" cx="0" cy="0" r="20" fill="#454343" />
            </svg>
          </div>
          <div style={{display: "inline"}}>
            <i className="material-icons player-icon">replay_10</i>
          </div>
          <div style={{display: "inline"}}>
              <i className="material-icons player-icon" onClick={this.togglePlay}>{this.state.playIcon}</i>
          </div>
          <div style={{display: "inline"}}>
            <i className="material-icons player-icon">forward_10</i>
          </div>
          {episode.title}
        </div>
        <Mutation mutation={SAVE_CURRENT_TIME}>
          {(saveCurrentTime, { data }) => (
            <audio
              src={episode.url}
              preload="auto"
              onTimeUpdate={() => {
                if ((Math.round(this.audio.currentTime) % 5) == 0) {
                  saveCurrentTime({ variables: { episodeId: episode._id, currentTime: this.audio.currentTime }});
                }
                this.setState({ played: this.audio.currentTime });
                this.updatePlayedAngle();
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
