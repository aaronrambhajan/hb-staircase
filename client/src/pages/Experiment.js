// @flow

import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { sample } from 'underscore';
import { SOUNDS } from '../sounds';
import { colors, changeOpacity } from '../colors';
import Header from '../components/Header';
import AudioPlayer from '../components/AudioPlayer';
import ListenButton from '../images/ListenButton';

const getSound = (intensity: Number, previous: Object) => {
  // Returns a random sample that _isn't_ the previous one.
  return sample(
    SOUNDS[intensity].filter((sound) => {
      if (
        (intensity === 1 || intensity === 10) && // maxed intensity
        !!previous && // there IS a previous sound
        SOUNDS[intensity].length > 1 // more than one sound
      ) {
        return sound !== previous;
      } else {
        return true;
      }
    })
  );
};

const defaultIntensity = 5;

const styles = {
  main: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  audioPlayer: {
    display: 'flex',
    flexDirection: 'row',
  },
  audio: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 50,
  },
  subtext: {
    color: changeOpacity(colors.STANDARD, 0.5),
    fontSize: '14px',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default class Experiment extends Component {
  props: {
    onComplete: Function,
  };

  state: {
    subject: String,
    sound: Object,
    intensity: Number,
    trial: Number,
    currentTime: Number,
    displayText: String,
    disableButtons: Boolean,
  };

  state = {
    subject:
      new Date().valueOf().toString(36) +
      Math.random()
        .toString(36)
        .substr(2),
    sound: getSound(defaultIntensity),
    intensity: defaultIntensity,
    trial: 1,
    currentTime: Date.now(),

    // Buttons are disabled until the user has pressed play!
    disableButtons: true,
    displayText: (
      <div>
        Do you hear{' '}
        <span style={{ color: colors.LAB_PRIMARY, fontWeight: 'bold' }}>
          S3
        </span>
        ?
      </div>
    ),
  };

  handleResponse = (correct: Boolean) => {
    this._saveResponse(correct);

    const newIntensity = correct
      ? this.state.intensity <= 1
        ? this.state.intensity
        : this.state.intensity - 1
      : this.state.intensity > 8
        ? this.state.intensity
        : this.state.intensity + 2;

    this._toNextTrial(newIntensity);
  };

  _toNextTrial = (newIntensity: Number) => {
    this.setState({
      sound: getSound(newIntensity, this.state.sound),
      intensity: newIntensity,
      trial: this.state.trial + 1,
      currentTime: Date.now(),
      disableButtons: true,
    });
  };

  _saveResponse = (isCorrect: Boolean) => {
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
      .then((response) => response.json())
      .then((res) =>
        console.log('Successfully written to DB: ', JSON.stringify(res))
      )
      .catch((error) => {
        console.error('Error: ', error);
      });
  };

  disableButtons = () => {
    if (this.state.disableButtons) {
      this.setState({
        disableButtons: false,
      });
    }
  };

  heardIt = () => {
    if (!this.state.disableButtons) {
      this.handleResponse(this.state.sound.hasS3);
    }
  };

  notHeardIt = () => {
    if (!this.state.disableButtons) {
      this.handleResponse(!this.state.sound.hasS3);
    }
  };

  render = () => {
    // @todo: Disable the buttons if the sound hasn't started...
    // If the sound hasn't been played yet?

    if (this.state.trial === 31) {
      this.props.onComplete();
      return <div> Moving on... </div>;
    }

    return (
      <Container>
        <Header />
        <Row style={styles.main}>
          <Col xs="2" />
          <Col xs="8">
            <Row style={styles.audioPlayer}>
              <Col xs="2" />
              <Col style={styles.audio} xs="8">
                <AudioPlayer
                  onPlay={this.disableButtons}
                  file={this.state.sound.file}
                />
              </Col>
              <Col xs="2" />
            </Row>
            <div style={styles.titleText}>
              <h1 className="display-2">{this.state.displayText}</h1>
              <p style={styles.subtext} className="lead">
                {this.state.trial === 1
                  ? 'You can start by pressing play.'
                  : null}
              </p>
            </div>

            <Row>
              <Col style={styles.buttonContainer} xs="12">
                <div onClick={this.heardIt}>
                  <ListenButton
                    displayText="Heard it"
                    textX="115"
                    textY="269"
                    fill={colors.YES_BUTTON}
                    size={140}
                    isDisabled={this.state.disableButtons}
                  />
                </div>
                <div onClick={this.notHeardIt}>
                  <ListenButton
                    displayText="Didn't"
                    textX="148.529297"
                    textY="229"
                    fill={colors.NO_BUTTON}
                    size={140}
                    isTwoLines={{ displayText: 'hear it' }}
                    isDisabled={this.state.disableButtons}
                  />
                </div>
              </Col>
            </Row>
          </Col>
          <Col xs="2" />
        </Row>
      </Container>
    );
  };
}
