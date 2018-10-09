// @flow

import React from 'react';
import Sound from 'react-sound';
import { colors, changeOpacity } from '../colors';
import PlayButton from '../images/PlayButton';
import PauseButton from '../images/PauseButton';
import Ellipsis from '../images/Ellipsis';

const styles = {
  main: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    color: colors.LAB_SECONDARY,
    border: `solid ${changeOpacity(colors.DISABLED_BUTTON, 0.1)}`,
    borderWidth: 2,
    borderRadius: 20,
    backgroundColor: changeOpacity(colors.DISABLED_BUTTON, 0.25),
    maxWidth: 250,
  },
  buttons: {
    height: 45,
    width: 67.5,
    maxHeight: 100,
    maxWidth: 120,
    overflow: 'scroll',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  displayText: {
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 4,
    color: changeOpacity(colors.LAB_SECONDARY, 0.5),
    fontSize: '12px',
  },
  timer: {
    fontSize: '16px',
    textAlign: 'center',
    color: 'black',
  },
};

const formatAudioTime = (time: Number) => {
  const rounded = Math.round(time / 1000);
  return rounded < 10 ? '00:0' + rounded : '00:' + rounded;
};

export default class AudioPlayer extends React.Component {
  props: {
    file: String,
    hasS3: Boolean,
    onPress: Function,
    onPlay: Function, // Enables buttons
    isLooping: Boolean,
  };
  state: {
    displayText: String,
    duration: String,
    position: String,
    status: String,
  };
  state = {
    displayText: 'Loading...',
    duration: '00:00',
    position: '00:00',
    status: Sound.status.PAUSED,
  };

  shouldComponentUpdate = (nextProps, nextState) => {
    // iff we're moving onto the next sound
    if (nextProps.file !== this.props.file) {
      // we want to reset the state of the sound
      nextState.status = Sound.status.PAUSED;
    }

    return true;
  };

  updateStatus = (text: String) => {
    this.setState({
      displayText: text,
    });
  };

  handleButtonPress = () => {
    switch (this.state.status) {
      case Sound.status.STOPPED:
        this.setState({ status: Sound.status.PAUSED });
        break;
      case Sound.status.PAUSED:
        this.setState({ status: Sound.status.PLAYING });
        break;
      case Sound.status.PLAYING:
        this.setState({ status: Sound.status.PAUSED });
        break;
    }
  };

  renderPlayerButton = () => {
    switch (this.state.status) {
      case Sound.status.PAUSED:
        return <PlayButton size={45} onPress={this.handleButtonPress} />;
      case Sound.status.PLAYING:
        return <PauseButton size={45} onPress={this.handleButtonPress} />;
      default:
        return <Ellipsis size={15} />;
    }
  };

  render = () => {
    return (
      <div style={styles.main}>
        {/* Play/Pause Buttons...  */}
        <div style={styles.buttons} onClick={this.props.onPlay}>
          {this.renderPlayerButton()}
        </div>
        {/* Sound file..  */}
        <Sound
          url={this.props.file}
          playStatus={this.state.status}
          autoLoad={true}
          loop={this.props.isLooping}
          onLoading={(soundObj) => {
            this.setState({
              duration: formatAudioTime(soundObj.duration),
            });
          }}
          onLoad={(soundObj) => {
            if (soundObj.loaded) {
              this.setState({
                displayText: 'Press to play.',
              });
            }
          }}
          onPlaying={(soundObj) => {
            if (soundObj.position < soundObj.duration) {
              this.setState({
                position: formatAudioTime(soundObj.position),
                displayText: 'Playing...',
              });
            } else {
              // Because onFinishedPlaying is useless...
              this.setState({
                status: Sound.status.STOPPED,
              });
            }
          }}
          onPause={(soundObj) => {
            this.setState({ displayText: 'Paused.' });
          }}
          onStop={(soundObj) => {
            // Always passes through this, even when going onto next sound
            this.setState({
              position: '00:00',
              duration: '00:00',
              displayText: 'Sound over. Please respond.',
            });
          }}
          onFinishedPlaying={() => {
            this.setState({
              status: Sound.status.STOPPED,
              displayText: 'Sound over. Please respond.',
            });
          }}
          onError={(soundObj) => {
            this.setState({
              displayText: 'Something went wrong... Contact experimenter.',
            });
          }}
        />
        {/* Time position! */}
        <p style={styles.displayText}>{this.state.displayText}</p>
        <p style={styles.timer} className="lead">
          {this.state.position}
          {' / '}
          {this.state.duration}
        </p>
      </div>
    );
  };
}
