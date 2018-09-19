import React from 'react';
import { Button, Container } from 'reactstrap';
import { colors } from '../colors';
import Header from '../components/Header';

const styles = {
  main: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
};
export default class Instructions extends React.Component {
  props: {
    onConfirmation: Function,
  };

  render = () => {
    return (
      <Container>
        <Header />
        <h1 className="display-3">The S3 Heartbeat</h1>
        <p className="lead">
          In this experiment, you will be listening to heartbeat sounds! Your
          task will be to listen for the "third" heart sound in the heartbeat.
        </p>
        <hr className="my-2" />
        <p style={{ fontSize: '16px' }}>
          Normal heartbeats differ from heartbeats with S3 in one key way. What
          follows is a diagram that visualizes their difference, as you can see
          here. <br /> <br />
          Without S3: <br /> <br />
          <div style={{ textAlign: 'center' }}>
            <code>
              lub..........dub.................lub..........dub.................lub..........dub..................lub..........dub...
            </code>
          </div>
          <br />
          <br />
          With S3: <br /> <br />
          <div style={{ textAlign: 'center' }}>
            <code>
              lub.........dub..dub.................lub...........dub..dub......................lub...............dub..dub............
            </code>
          </div>
          <br />
          <br />
          Accordingly, we want you to indicate whether you hear the sound of S3
          in the heartbeats you hear. If you do, you are to indicate that you
          heard S3–otherwise indicate that you didn't. You have 10 seconds for
          each sample followed by a short break. This experiment must be done on
          headphones. If you have any questions, please don't hesitate to
          contact the experimenter. Thank you for your participation, and good
          luck!
          <br />
        </p>
        <p className="lead">
          <Button color="primary" size="lg" onClick={this.props.onConfirmation}>
            Continue
          </Button>
        </p>
      </Container>
    );
  };
}
