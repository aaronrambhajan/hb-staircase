import React from 'react';
import { Container } from 'reactstrap';
import Header from '../components/Header';

export default class Finished extends React.Component {
  render = () => {
    return (
      <Container>
        <Header />
        <div>
          <h1 className="display-3">
            <span role="img" aria-label="Brain">
              🧠
            </span>
            <span role="img" aria-label="Thumbs-up">
              👍
            </span>
            <span role="img" aria-label="Starry-eyes">
              🤩
            </span>
            <span role="img" aria-label="Heartbeat">
              💖
            </span>
          </h1>
          <h1 className="display-5">Congratulations – you're finished now!</h1>
          <p className="lead">Please let the experimenter know.</p>
        </div>
      </Container>
    );
  };
}
