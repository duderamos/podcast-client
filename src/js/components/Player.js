import React from 'react';
import ApolloClient from 'apollo-boost';
import { Mutation } from 'react-apollo';
import { SAVE_CURRENT_TIME } from '../graphql/Mutations';

class Player extends React.Component {
  constructor(props) {
    super(props);

    this.cycles = 0;

    this.state = {
      playing: false,
      playIcon: "play_circle_filled",
      playedAngle: ""
    }
  }

  setupProgress = () => {
    this.audio.currentTime = this.props.episode.currentTime;
    this.updatePlayedAngle();
  }

  togglePlay = () => {
    if (this.state.playing) {
      this.setState({
        playing: false,
        playIcon: "play_circle_filled"
      });
      this.audio.pause();
      clearInterval(this.pingBackend);
    } else {
      this.setState({
        playing: true,
        playIcon: "pause_circle_filled"
      });
      this.audio.play();
      setInterval(this.pingBackend, 5000);
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

  pingBackend = () => {
    const { episode } = this.props;
    this.saveCurrentTime({ variables: { episodeId: episode._id, currentTime: this.audio.currentTime }});
  }

  render() {
    const { episode } = this.props;
    return (
      <div className="player-box">
        <div id="loading">
          <img src="https://freepreloaders.com/wp-content/uploads/2019/05/puff-1.svg"/>
        </div>
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
              this.timeFormatted(this.audio.currentTime)
            }
          </div>
        </div>
        <Mutation mutation={SAVE_CURRENT_TIME}>
          {(saveCurrentTime, { data }) => {
            this.saveCurrentTime = saveCurrentTime;
            return (
            <audio
              src={episode.url}
              preload="metadata"
              onCanPlay={() => {
                document.getElementById("loading").style.display = "none";
              }}
              onLoadStart={() => {
                document.getElementById("loading").style.display = "block";
              }}
              onLoadedMetadata={this.setupProgress}
              onTimeUpdate={this.updatePlayedAngle}
              ref={(audio) => { this.audio = audio }}
            />
          )}}
        </Mutation>
      </div>
    );
  }
}

export default Player;
