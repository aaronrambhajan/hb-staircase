// @flow

import React, { Component } from 'react';
import { Button, Container, Row, Col, Jumbotron } from 'reactstrap';
import { sample } from 'underscore';
import { SOUNDS } from '../sounds';
import { colors } from '../colors';
import Header from '../components/Header';
import AudioPlayer from '../components/AudioPlayer';
import ListenButton from '../images/ListenButton';
import StatusBar from '../images/StatusBar';

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
  audioPlayer: {
    marginTop: 20,
    marginBottom: 20,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
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
    displayText: (
      <div>
        Do you hear <b>S3</b>?
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
      .then((res) => {
        res.json();
      })
      .then((res) => {
        !res.success
          ? console.log("didn't work", res)
          : console.log('did work', res);
      })
      .catch((error) => {
        console.error('Error: ', error);
      });
  };

  heardIt = () => {
    this.handleResponse(this.state.sound.hasS3);
  };

  notHeardIt = () => {
    this.handleResponse(!this.state.sound.hasS3);
  };

  render = () => {
    // @todo: Disable the buttons if the sound hasn't started...

    if (this.state.trial === 30) {
      this.props.onComplete();
      return <div> Moving on... </div>;
    }

    return (
      <Container>
        <Header />
        <Row>
          <Col xs="2" />
          <Col xs="8">
            <h1 style={{ textAlign: 'center' }} className="display-3">
              {this.state.displayText}
            </h1>
            {/* <p style={{ textAlign: 'center' }} className="lead">
              If you don't, just remember that you're looking to differentiate
              these: <br />
              <code style={{ fontSize: 10 }}>
                lub..........dub.................lub..........dub.................lub..........dub..................lub..........dub...
              </code>
              <br />
              <code style={{ fontSize: 10 }}>
                lub.........dub..dub.................lub...........dub..dub......................lub...............dub..dub............
              </code>
              <br />
            </p> */}
            <Row style={styles.audioPlayer}>
              <Col xs="2" />
              <Col xs="8">
                <AudioPlayer file={this.state.sound.file} />
              </Col>
              <Col xs="2" />
            </Row>
            <Row>
              <Col style={styles.buttonContainer} xs="12">
                <div onClick={this.heardIt}>
                  <ListenButton
                    displayText="Heard it"
                    textX="115"
                    textY="269"
                    fill={colors.YES_BUTTON}
                    size={150}
                  />
                </div>
                <div onClick={this.notHeardIt}>
                  <ListenButton
                    displayText="Didn't"
                    textX="148.529297"
                    textY="229"
                    fill={colors.NO_BUTTON}
                    size={150}
                    isTwoLines={{ displayText: 'hear it' }}
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
