import React from 'react';

export default class Ellipsis extends React.Component {
  props: {
    size: Number,
  };

  render = () => {
    return (
      <svg
        onClick={this.props.onPress}
        width={this.props.size * 3.3}
        height={this.props.size}
        viewBox="0 0 330 100"
      >
        <g fill="none" fillRule="evenodd">
          <g fill="#000">
            <circle id="Oval" cx="50" cy="50" r="50" />
            <circle id="Oval" cx="280" cy="50" r="50" />
            <circle id="Oval" cx="165" cy="50" r="50" />
          </g>
        </g>
      </svg>
    );
  };
}
