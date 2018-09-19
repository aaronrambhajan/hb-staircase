// @flow

import React, { Component } from 'react';
import { Button, Container, Row, Col, Jumbotron } from 'reactstrap';
import { colors } from './colors';
import { status } from './status';
import Instructions from './pages/Instructions';
import Finished from './pages/Finished';
import Consent from './pages/Consent';
import Experiment from './pages/Experiment';

const styles = {
  main: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default class MainPage extends Component {
  state: {
    status: String,
  };

  state = {
    status: status.CONSENT,
  };

  updateStatus = (state: String) => {
    this.setState({
      status: state,
    });
  };

  render = () => {
    if (this.state.status === status.CONSENT) {
      return (
        <div style={styles.main}>
          <Consent
            onConfirmation={() => {
              this.updateStatus(status.INSTRUCTIONS);
            }}
          />
        </div>
      );
    }

    if (this.state.status === status.INSTRUCTIONS) {
      return (
        <div style={styles.main}>
          <Instructions
            onConfirmation={() => {
              this.updateStatus(status.EXPERIMENT);
            }}
          />
        </div>
      );
    }

    if (this.state.status === status.EXPERIMENT) {
      return (
        <Experiment
          onComplete={() => {
            this.updateStatus(status.FINISHED);
          }}
        />
      );
    }

    if (this.state.status === status.FINISHED) {
      return <Finished />;
    }
  };
}
