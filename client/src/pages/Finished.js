import React from 'react';
import { Container } from 'reactstrap';
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
export default class Finished extends React.Component {
  render = () => {
    return (
      <Container>
        <Header />
        <div style={styles.instructionText}>
          You're finished now, congratulations! Please get the experimenter.
        </div>
      </Container>
    );
  };
}
