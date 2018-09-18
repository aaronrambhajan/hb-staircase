import React from 'react';
import { colors } from '../colors';

export default class OKButton extends React.Component {
  props: {
    displayText: String,
    size: Number,
  };

  render = () => {
    return (
      <svg
        height={this.props.size}
        width={this.props.size * 4.1711}
        version="1.1"
        viewBox="0 0 463 111"
      >
        <defs />
        <g fill="none" stroke="none" strokeWidth="1">
          <g>
            <g>
              <rect
                height="111"
                width="463"
                fill={colors.LAB_SECONDARY}
                rx="8"
                x="0"
                y="0"
              />
              <rect
                height="89"
                width="449"
                fill={colors.LAB_PRIMARY}
                rx="8"
                x="8"
                y="11"
              />
            </g>
            <text
              id="Continue"
              fill={colors.LAB_SECONDARY}
              fontFamily="Helvetica-Bold, Helvetica"
              fontSize="72"
            >
              <tspan x="76.0292969" y="79">
                {this.props.displayText}
              </tspan>
            </text>
          </g>
        </g>
      </svg>
    );
  };
}
