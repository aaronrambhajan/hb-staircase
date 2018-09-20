import React from 'react';
import { Container, Button } from 'reactstrap';
import Header from '../components/Header';

export default class Starting extends React.Component {
  props: {
    onConfirmation: Function,
  };

  render = () => {
    return (
      <Container>
        <Header />
        <h1 className="display-3" style={{ fontWeight: 500 }}>
          Heartbeats{' '}
          <span role="img" aria-label="Heartbeat">
            💖
          </span>
        </h1>
        <p className="lead">
          Welcome to our experiment! To begin, please continue to our consent
          form.
          <br /> <br />
          <Button color="primary" size="lg" onClick={this.props.onConfirmation}>
            <span role="img" aria-label="Thumbs-up">
              👍
            </span>{' '}
            Continue
          </Button>
        </p>
      </Container>
    );
  };
}
