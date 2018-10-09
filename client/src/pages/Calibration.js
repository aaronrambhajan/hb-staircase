// @flow

import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import { SOUNDS } from '../sounds';
import { colors } from '../colors';
import Header from '../components/Header';
import AudioPlayer from '../components/AudioPlayer';

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
    marginBottom: 30,
    marginTop: 30,
  },
  titleText: {
    fontWeight: 'lighter',
  },
};

export default class Calibration extends Component {
  props: {
    onConfirmation: Function,
  };

  // Placeholder function so I don't commit `undefined` sin.
  onPlay = () => {
    console.log("it's playing.");
  };

  render = () => {
    return (
      <Container>
        <Header />
        <Row style={styles.main}>
          <Col xs="2" />
          <Col xs="8">
            <div style={styles.titleText}>
              <h1 style={{ fontWeight: 200 }}>
                You will now listen to a{' '}
                <span style={{ color: colors.LAB_PRIMARY, fontWeight: 'bold' }}>
                  regular{' '}
                </span>
                heartbeat so the experimenter can set your volume level.
              </h1>
              <p style={{ fontWeight: 200 }} className="lead">
                Please let them know when the volume is comfortable for you.
              </p>
            </div>

            <Row style={styles.audioPlayer}>
              <Col xs="2" />
              <Col style={styles.audio} xs="8">
                <AudioPlayer
                  onPlay={this.onPlay}
                  file={SOUNDS.calibration}
                  isLooping={true}
                />
              </Col>
              <Col xs="2" />
            </Row>
            {/* Button to press once volume has been calibrated. */}
            <Button
              color="primary"
              size="lg"
              onClick={this.props.onConfirmation}
            >
              <span role="img" aria-label="Thumbs-up">
                👍
              </span>{' '}
              Volume is good
            </Button>
          </Col>
          <Col xs="2" />
        </Row>
      </Container>
    );
  };
}
