import React from 'react';

export default class StatusBar extends React.Component {
  props: {
    intensity: Number,
    size: String,
    statusFill: String,
  };

  shouldComponentUpdate = (nextProps, nextState) => {
    return nextProps.intensity !== this.props.intensity;
  };

  renderStatusObject = () => {
    var statusBars = [];

    for (var i = 0; i < this.props.intensity; i++) {
      const opacity = String(0.5 + 0.05 * i);
      const xLocation = String(15 + 53 * i);

      statusBars.push(
        <rect
          height="77"
          width="48.3"
          fill={this.props.statusFill}
          fillOpacity={opacity}
          rx="8"
          x={xLocation}
          y="17"
        />
      );
    }

    return statusBars.map((item) => item);
  };

  render = () => {
    return (
      <svg
        height={String(this.props.size)}
        width={String(this.props.size * 4.982)}
        viewBox="0 0 553 111"
      >
        <defs />
        <g fill="none" stroke="none" strokeWidth="1">
          <g>
            <g>
              <rect
                height="111"
                id="Rectangle"
                width="553"
                fill="#000000"
                rx="8"
                x="0"
                y="0"
              />
              <rect
                height="89"
                id="Rectangle"
                width="536"
                fill="#FFFFFF"
                rx="8"
                x="9"
                y="11"
              />
            </g>
            {this.renderStatusObject()}
          </g>
        </g>
      </svg>
    );
  };
}
