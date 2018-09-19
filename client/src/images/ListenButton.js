import React from 'react';
import { colors } from '../colors';

export default class ListenButton extends React.Component {
  props: {
    displayText: String,
    textX: String,
    textY: String,
    fill: String,
    size: String,
    isTwoLines: Boolean,
    isDisabled: Boolean,
  };

  render = () => {
    return (
      <svg
        height={this.props.size}
        width={this.props.size}
        version="1.1"
        viewBox="0 0 500 500"
      >
        <defs />
        <g fill="none" stroke="none" strokeWidth="1">
          <g>
            <circle
              cx="250"
              cy="250"
              fill="#000000"
              fillOpacity="0.24"
              r="250"
            />
            <circle
              cx="250.5"
              cy="250.5"
              fill={
                this.props.isDisabled ? colors.DISABLED_BUTTON : this.props.fill
              }
              r="210.5"
            />
            <text
              fill="#FFFFFF"
              fontFamily="Helvetica-Bold, Helvetica"
              fontSize="72"
            >
              <tspan x={this.props.textX} y={this.props.textY}>
                {this.props.displayText}
                {this.props.isTwoLines ? (
                  <tspan x="142.464844" y="315">
                    {this.props.isTwoLines.displayText}
                  </tspan>
                ) : null}
              </tspan>
            </text>
          </g>
        </g>
      </svg>
    );
  };
}
