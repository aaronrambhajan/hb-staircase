// @flow

import React, { Component } from 'react';
import Sound from 'react-sound';
import { sample } from 'underscore';
import { SOUND_FILES } from './sounds';
import ListenButton from './components/ListenButton';
import StatusBar from './components/StatusBar';

const styles = {
  main: {},
  displayText: {
    fontSize: '300%',
    fontWeight: 'bold',
    border: 'solid black',
    borderWidth: 2,
    borderRadius: 15,
    backgroundColor: 'lavender',
    padding: 10,
    margin: 10,
    color: 'black',
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    margin: 10,
  },
  statusBar: {
    margin: 10,
    // display: 'flex',
    // flexDirection: 'column',
    // justifyContent: 'flex-end',
  },
};

export default class MainPage extends Component {
  state: {
    subject: String,
    sound: Object,
    intensity: Number,
    trial: Number,
    currentTime: Number,
    soundState: String,
    displayText: String,
  };

  state = {
    subject:
      new Date().valueOf().toString(36) +
      Math.random()
        .toString(36)
        .substr(2),
    sound: sample(SOUND_FILES[5]),
    intensity: 5,
    trial: 1,
    currentTime: Date.now(),

    soundState: Sound.status.PAUSED,
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

  handleResponse = (correct: Boolean) => {
    this._saveResponse(correct);

    const newIntensity = correct
      ? this.state.intensity < 1
        ? this.state.intensity
        : this.state.intensity - 1
      : this.state.intensity > 8
        ? this.state.intensity
        : this.state.intensity + 2;

    this._toNextTrial(newIntensity);
  };

  _toNextTrial = (newIntensity: Number) => {
    this.setState({
      sound: sample(SOUND_FILES[newIntensity]),
      intensity: newIntensity,
      trial: this.state.trial + 1,
      currentTime: Date.now(),
    });
  };

  _saveResponse = (isCorrect) => {
    fetch('/api/response', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        subject: this.state.subject,
        sound: this.state.sound.file,
        intensity: this.state.intensity,
        trial: this.state.trial,
        rt: Date.now() - this.state.currentTime,
        isCorrect,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        !res.success ? console.log("didn't work") : console.log('did work');
      });
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
    if (this.state.trial === 40) {
      // end!!!!!!!
    }

    if (this.state.intensity === 10) {
      // @todo What happens at the highest intensity?
      // do something?
    }

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
