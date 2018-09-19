// @flow

import React from 'react';
import Sound from 'react-sound';
import { Container, Row, Col } from 'reactstrap';
import PlayButton from '../images/PlayButton';
import PauseButton from '../images/PauseButton';
import Ellipsis from '../images/Ellipsis';

const styles = {
  main: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    border: 'solid black',
    borderWidth: 3,
    borderRadius: 10,
    padding: 5,
  },
  buttons: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timer: {},
};

const formatAudioTime = (time: Number) => {
  const rounded = Math.round(time / 1000);
  return rounded < 10 ? '00:0' + rounded : '00:' + rounded;
};

// @todo: Disable answering BEFORE THE AUDIO PLAYS

export default class AudioPlayer extends React.Component {
  props: {
    file: String,
    hasS3: Boolean,
    onPress: Function,
  };
  state: {
    displayText: String,
    duration: String,
    position: String,
    status: String,
  };
  state = {
    displayText: 'Loading...',
    duration: '00:00',
    position: '00:00',
    status: Sound.status.PAUSED,
  };

  shouldComponentUpdate = (nextProps, nextState) => {
    // iff we're moving onto the next sound
    if (nextProps.file !== this.props.file) {
      nextState.status = Sound.status.PAUSED;
    }

    return true;
  };

  updateStatus = (text: String) => {
    this.setState({
      displayText: text,
    });
  };

  handleButtonPress = () => {
    switch (this.state.status) {
      case Sound.status.STOPPED:
        this.setState({ status: Sound.status.PAUSED });
        break;
      case Sound.status.PAUSED:
        this.setState({ status: Sound.status.PLAYING });
        break;
      case Sound.status.PLAYING:
        this.setState({ status: Sound.status.PAUSED });
        break;
    }
  };

  renderPlayerButton = () => {
    switch (this.state.status) {
      case Sound.status.PAUSED:
        return <PlayButton size={24} onPress={this.handleButtonPress} />;
      case Sound.status.PLAYING:
        return <PauseButton size={24} onPress={this.handleButtonPress} />;
      default:
        return <Ellipsis size={8} onPress={this.handleButtonPress} />;
    }
  };

  render = () => {
    // return (
    //   <Container style={styles.main}>
    //     <Row>
    //       <Col style={styles.buttons} xs={3}>
    //         {this.renderPlayerButton()}
    //       </Col>
    //       <Col style={{ textAlign: 'center' }} xs={6}>
    //         {this.state.displayText}
    //       </Col>
    //       <Col xs={3}>
    //         {this.state.position}
    //         {' / '}
    //         {this.state.duration}
    //       </Col>
    //     </Row>
    //   </Container>
    // );
    return (
      <div style={styles.main}>
        {/* Play/Pause Buttons...  */}
        {this.renderPlayerButton()}

        <div>{this.state.displayText}</div>

        {/* Sound file..  */}
        <Sound
          url={this.props.file}
          playStatus={this.state.status}
          autoLoad={true}
          onLoading={(soundObj) => {
            this.setState({
              duration: formatAudioTime(soundObj.duration),
            });
          }}
          onLoad={(soundObj) => {
            if (soundObj.loaded) {
              this.setState({
                displayText: 'Press to play.',
              });
            }
          }}
          onPlaying={(soundObj) => {
            if (soundObj.position < soundObj.duration) {
              this.setState({
                position: formatAudioTime(soundObj.position),
                displayText: 'Playing...',
              });
            } else {
              // Because onFinishedPlaying is useless...
              this.setState({
                status: Sound.status.STOPPED,
              });
            }
          }}
          onPause={(soundObj) => {
            this.setState({ displayText: 'Paused.' });
          }}
          onStop={(soundObj) => {
            // Always passes through this, even when going onto next sound
            this.setState({
              position: '00:00',
              duration: '00:00',
              displayText: 'Sound over. Please respond.',
            });
          }}
          onFinishedPlaying={() => {
            this.setState({
              status: Sound.status.STOPPED,
              displayText: 'Sound over. Please respond.',
            });
          }}
          onError={(soundObj) => {
            this.setState({
              displayText: 'Something went wrong... Contact experimenter.',
            });
          }}
        />

        {/* Time position! */}
        {this.state.position}
        {' / '}
        {this.state.duration}
      </div>
    );
  };
}
