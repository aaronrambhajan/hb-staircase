import React from 'react';
import { Button, Container } from 'reactstrap';
import { colors } from '../colors';
import Header from '../components/Header';

export default class Instructions extends React.Component {
  props: {
    onConfirmation: Function,
  };

  render = () => {
    return (
      <Container>
        <Header />
        <h1 style={{ fontWeight: 500 }} className="display-3">
          The{' '}
          <span style={{ color: colors.LAB_PRIMARY, fontWeight: 'bold' }}>
            S3
          </span>{' '}
          Heartbeat{' '}
          <span role="img" aria-label="Heartbeat">
            💖
          </span>
        </h1>
        <p className="lead">
          In this experiment, you'll be listening to heartbeat
          sounds–specifically, you'll be listening for the "third" sound.
        </p>
        <hr className="my-2" />
        <p style={{ fontSize: '16px' }}>
          Normal heartbeats differ from heartbeats with S3 in one key way.
          Below, you'll see a diagram that visualizes the difference. <br />{' '}
          <br />
          <i>Without</i> S3: <br /> <br />
          <div style={{ textAlign: 'center' }}>
            <code>
              lub..........dub.................lub..........dub.................lub..........dub..................lub..........dub...
            </code>
          </div>
          <br />
          <br />
          <i>With</i> S3: <br /> <br />
          <div style={{ textAlign: 'center' }}>
            <code>
              lub.........dub..dub.................lub...........dub..dub......................lub...............dub..dub............
            </code>
          </div>
          <br />
          <br />
          We want you to{' '}
          <b>
            {' '}
            indicate whether you hear the sound of S3 in the samples we present
            to you
          </b>
          . If you do, press the button that says <b>Heard it</b>. Otherwise,
          press the button that says <b>I didn't hear it</b>. You have 10
          seconds for each sample. This experiment must be done on headphones.
          If you have any questions, please don't hesitate to contact the
          experimenter. Thank you for your participation, and good luck!
          <br />
        </p>
        <p className="lead">
          <Button color="primary" size="lg" onClick={this.props.onConfirmation}>
            <span role="img" aria-label="Thumbs-up">
              👍
            </span>{' '}
            I understand
          </Button>
        </p>
      </Container>
    );
  };
}
