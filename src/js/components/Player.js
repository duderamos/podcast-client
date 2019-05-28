import React from 'react';
import ApolloClient from 'apollo-boost';
import { Mutation } from 'react-apollo';
import { SAVE_CURRENT_TIME } from '../graphql/Mutations';

class Player extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      playing: false,
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
        playing: false,
        playIcon: "play_circle_filled"
      });
      this.audio.pause();
    } else {
      this.setState({
        playing: true,
        playIcon: "pause_circle_filled"
      });
      this.audio.play();
    }
  }

  updatePlayedAngle = () => {
    const pi = Math.PI;
    let angle = (this.state.played * 360) / this.audio.duration;
    if (Number.isNaN(this.audio.duration)) return;
    let r = ( angle * pi / 180 )
    let x = Math.sin( r ) * 25
    let y = Math.cos( r ) * - 25
    let mid = ( angle > 180 ) ? 1 : 0
    let anim = `M 0 0 v -25 A 25 25 1 ${mid} 1 ${x} ${y} z`;
    this.setState({ playedAngle: anim });
  }

  backwards = () => {
    this.audio.currentTime -= 10;
  }

  forwards = () => {
    this.audio.currentTime += 10;
  }

  timeFormatted = (time) => {
    time = parseFloat(time);
    const hours = Math.floor(time / 60 / 60);
    const minutes = Math.floor(time / 60) % 60;
    const seconds = Math.floor(time - minutes * 60);

    let timeString = "";
    if (hours > 0) timeString += hours.toString().padStart(2, 0) + ':';
    timeString += minutes.toString().padStart(2, 0) + ':';
    timeString += seconds.toString().padStart(2, 0);
    return timeString;
  }

  render() {
    const { episode } = this.props;
    return (
      <div className="player-box">
        <div id="progress-circle">
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
        <div>
          <i className="material-icons player-icon" onClick={this.backwards}>replay_10</i>
        </div>
        <div style={{zIndex: 99}}>
          <i className="material-icons player-icon" onClick={this.togglePlay}>{this.state.playIcon}</i>
        </div>
        <div>
          <i className="material-icons player-icon" onClick={this.forwards}>forward_10</i>
        </div>
        <div stype={{display: 'flex', flexDirection: 'column'}}>
          <div>
            {episode.title}
          </div>
          <div>
            {this.audio &&
              this.timeFormatted(this.state.played)
            }
          </div>
        </div>
        <Mutation mutation={SAVE_CURRENT_TIME}>
          {(saveCurrentTime, { data }) => (
            <audio
              src={episode.url}
              preload="metadata"
              onTimeUpdate={() => {
                if ((Math.round(this.state.played) % 5) == 0) {
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
