import React from 'react';

export default class PlayButton extends React.Component {
  props: {
    size: Number,
    onPress: Function,
  };

  render = () => {
    return (
      <svg
        onClick={this.props.onPress}
        width={this.props.size}
        height={this.props.size}
        viewBox="0 0 24 24"
      >
        <path d="M3 22v-20l18 10-18 10z" />
      </svg>
    );
  };
}
