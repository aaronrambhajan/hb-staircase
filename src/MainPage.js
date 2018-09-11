// @flow

import React, { Component } from 'react';
import Sound from 'react-sound';
import { SOUND_FILES } from './sounds';
import ListenButton from './components/ListenButton';
import StatusBar from './components/StatusBar';

const styles = {
  main: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  displayText: {
    color: 'red',
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statusBar: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
};

export default class MainPage extends Component {
  state: {
    intensity: Number,
    sound: Object,
  };

  state = {
    intensity: 2,
    sound: SOUND_FILES[2][0],
    soundState: Sound.status.STOPPED,
    displayText: 'DEFAULT',
  };

  /*
  shouldComponentUpdate = (nextProps, nextState) => {
    return (
      nextState.intensity !== this.state.intensity ||
      nextState.soundState !== this.state.soundState
    );
  };
  */

  // @todo: randomly select from the array
  // @todo: SAVE the result
  handleResponse = (correct) => {
    if (correct) {
      const intensityChange =
        this.state.intensity < 1
          ? this.state.intensity
          : this.state.intensity - 1;

      this.setState({
        intensity: intensityChange,
        sound: SOUND_FILES[intensityChange][0],
      });
    } else {
      const intensityChange =
        this.state.intensity > 8
          ? this.state.intensity
          : this.state.intensity + 2;

      this.setState({
        intensity: intensityChange,
        sound: SOUND_FILES[intensityChange][0],
      });
    }
  };

  heardIt = () => {
    this.handleResponse(this.state.sound.hasS3);
  };

  notHeardIt = () => {
    this.handleResponse(!this.state.sound.hasS3);
  };

  updateSoundState = () => {
    if (this.state.soundState === Sound.status.STOPPED) {
      this.setState({
        soundState: Sound.status.PLAYING,
      });
      return;
    }

    if (this.state.soundState === Sound.status.PLAYING) {
      this.setState({
        soundState: Sound.status.PAUSED,
      });
      return;
    }

    if (this.state.soundState === Sound.status.PAUSED) {
      this.setState({
        soundState: Sound.status.PLAYING,
      });
      return;
    }
  };

  updateText = (text) => {
    this.setState({
      displayText: text,
    });
  };

  render = () => {
    console.log('STATE: ', this.state);

    return (
      <div style={styles.main}>
        <div style={styles.displayText} onClick={this.updateSoundState}>
          {this.state.displayText}
          <Sound
            url={this.state.sound.file}
            playStatus={this.state.soundState}
            autoLoad={true}
            onLoading={(soundObj) => {
              this.updateText('Loading...');
            }}
            onLoad={(soundObj) => {
              this.updateText('Press to play.');
            }}
            onPlaying={(soundObj) => {
              this.updateText('Playing...');
            }}
            onPause={(soundObj) => {
              this.updateText('Paused.');
            }}
            onResume={(soundObj) => {
              this.updateText('Resuming.');
            }}
            onStop={(soundObj) => {
              this.updateText('Stopped.');
            }}
            onFinishedPlaying={(soundObj) => {
              this.updateText('Finished!');
            }}
            onError={(soundObj) => {
              this.updateText('Oops...');
            }}
          />
        </div>

        <div style={styles.buttons}>
          <div onClick={this.heardIt}>
            <ListenButton
              displayText="Heard it"
              textX="115"
              textY="269"
              fill="#57A700"
              size="150"
            />
          </div>
          <div onClick={this.notHeardIt}>
            <ListenButton
              displayText="Didn't"
              textX="148.529297"
              textY="229"
              fill="#FF0000"
              size="150"
              isTwoLines={{ displayText: 'hear it' }}
            />
          </div>
        </div>

        <div style={styles.statusBar}>
          <StatusBar
            size={100}
            statusFill="#FF0000"
            intensity={this.state.intensity}
          />
        </div>
      </div>
    );
  };
}
