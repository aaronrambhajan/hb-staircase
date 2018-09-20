// @flow

import React, { Component } from 'react';
import { status } from './status';
import Starting from './pages/Starting';
import Consent from './pages/Consent';
import Instructions from './pages/Instructions';
import Experiment from './pages/Experiment';
import Finished from './pages/Finished';

const styles = {
  main: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default class Main extends Component {
  state: {
    status: String,
  };

  state = {
    status: status.STARTING,
  };

  updateStatus = (state: String) => {
    this.setState({
      status: state,
    });
  };

  render = () => {
    if (this.state.status === status.STARTING) {
      return (
        <div style={styles.main}>
          <Starting
            onConfirmation={() => {
              this.updateStatus(status.CONSENT);
            }}
          />
        </div>
      );
    }

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
        <div style={styles.main}>
          <Experiment
            onComplete={() => {
              this.updateStatus(status.FINISHED);
            }}
          />
        </div>
      );
    }

    if (this.state.status === status.FINISHED) {
      return <Finished />;
    }
  };
}
