import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { TransitionMotion, spring } from "react-motion";

const Wrap = styled.div`
  ${p => p.wrapstyle};
`;

class TransitionScale extends Component {
  constructor(props) {
    super(props);
    this.motion = { stiffness: 120, damping: 9 };
    this.setStyle = this.setStyle.bind(this);
  }

  setStyle() {
    return this.props.items.map(item => ({
      key: item.key,
      style: { scale: spring(1, this.motion) },
      data: item.data
    }));
  }

  render() {
    const willLeave = () => ({ scale: spring(0, this.motion) });

    const willEnter = () => ({ scale: 0 });

    return (
      <TransitionMotion
        className={this.props.className}
        willLeave={willLeave}
        willEnter={willEnter}
        styles={this.setStyle()}
      >
        {interpolatedStyles => (
          <Wrap wrapstyle={this.props.wrapperStyle}>
            {interpolatedStyles.map(config => (
              <div
                key={config.key}
                style={{
                  transform: `scale(${config.style.scale})`
                }}
              >
                {config.data}
              </div>
            ))}
          </Wrap>
        )}
      </TransitionMotion>
    );
  }
}

if (process.env.NODE_ENV !== "production") {
  TransitionScale.propTypes = {
    className: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.shape),
    wrapperStyle: PropTypes.arrayOf(PropTypes.any)
  };
}

TransitionScale.defaultProps = {
  className: "",
  items: [],
  wrapperStyle: []
};

export default TransitionScale;
