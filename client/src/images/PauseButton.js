import React from 'react';

export default class PauseButton extends React.Component {
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
        <path d="M11 22h-4v-20h4v20zm6-20h-4v20h4v-20z" />
      </svg>
    );
  };
}
