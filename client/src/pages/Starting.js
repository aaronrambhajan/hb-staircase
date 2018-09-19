import React from 'react';
import { Container, Button } from 'reactstrap';
import Header from '../components/Header';

const styles = {
  main: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  instructionText: {
    marginTop: 20,
    marginLeft: 60,
    marginRight: 60,
    textAlign: 'center',
  },
};
export default class Starting extends React.Component {
  props: {
    onConfirmation: Function,
  };

  render = () => {
    return (
      <Container>
        <Header />
        <h1 className="display-3">Heartbeats</h1>
        <p className="lead">
          Welcome to our experiment! To begin, please continue to our consent
          form. <br /> <br />
          <Button color="primary" size="lg" onClick={this.props.onConfirmation}>
            Continue
          </Button>
        </p>
      </Container>
    );
  };
}
