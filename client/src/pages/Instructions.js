import React from 'react';
import { colors } from '../colors';
import LabLogo from '../components/LabLogo';
import OKButton from '../components/OKButton';
import { Grid, Row, Col } from 'react-bootstrap';

const styles = {
  main: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  instructionText: {
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
  },
  leftCol: {
    backgroundColor: colors.LAB_SECONDARY,
    height: '100vh',
  },
  rightCol: {
    backgroundColor: colors.LAB_SECONDARY,
    height: '100vh',
  },
};
export default class Instructions extends React.Component {
  props: {
    onConfirmation: Function,
  };

  render = () => {
    return (
      <div style={styles.main}>
        <Grid>
          <Row style={styles.rows}>
            <Col lg={2} style={styles.leftCol}>
              1 of 3
            </Col>
            <Col lg={8} style={styles.centerCol}>
              <LabLogo size={66.667} />
              <div style={styles.instructionText}>
                Hello, fellow participant! Welcome to our heartbeat experiment.
                For this experiment, we're going to ask you to listen to some
                samples of heartbeat sounds. We want you to tell us whether you
                can hear S3, an abnormality in heartbeats that is linked to a
                number of diseases. Hello, fellow participant! Welcome to our
                heartbeat experiment. For this experiment, we're going to ask
                you to listen to some samples of heartbeat sounds. We want you
                to tell us whether you can hear S3, an abnormality in heartbeats
                that is linked to a number of diseases. Hello, fellow
                participant! Welcome to our heartbeat experiment. For this
                experiment, we're going to ask you to listen to some samples of
                heartbeat sounds. We want you to tell us whether you can hear
                S3, an abnormality in heartbeats that is linked to a number of
                diseases.
              </div>
              <div onClick={this.props.onConfirmation}>
                <OKButton displayText="Continue" size={50} />
              </div>
            </Col>
            <Col lg={2} style={styles.rightCol}>
              3 of 3
            </Col>
          </Row>
        </Grid>
      </div>
    );
  };
}
