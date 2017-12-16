import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { StaggeredMotion, spring } from 'react-motion';

const Wrap = styled.div`
  ${p => p.wrapstyle};
`;
class StaggeredScale extends Component {
  constructor(props) {
    super(props);
    this.setInterpolatedStyle = this.setInterpolatedStyle.bind(this);
    this.applyMode = this.applyMode.bind(this);
  }

  setInterpolatedStyle(prevInterpolatedStyles) {
    const isIn = this.props.in;
    return prevInterpolatedStyles.map((_, i) => {
      const target = isIn ? 1 : 0;
      return i === 0
        ? { x: spring(target, this.props.motion) }
        : { x: spring(prevInterpolatedStyles[i - 1].x, this.props.motion) };
    });
  }

  applyMode(x) {
    switch (this.props.mode) {
      case 'SCALE':
      default:
        return `scale(${x})`;
      case 'TRANSLATE-RIGHT':
        return `translateX(${100 - x * 100}%)`;
      case 'TRANSLATE-LEFT':
        return `translateX(${-100 + x * 100}%)`;
    }
  }

  render() {
    const { items, opacity } = this.props;

    const defaultStyles = this.props.in ? items.map(() => ({ x: 0 })) : items.map(() => ({ x: 1 }));

    return (
      <StaggeredMotion defaultStyles={defaultStyles} styles={this.setInterpolatedStyle}>
        {interpolatingStyles => (
          <Wrap wrapstyle={this.props.wrapperStyle}>
            {interpolatingStyles.map((style, i) => (
              <div
                key={items[i].key}
                style={{
                  transform: this.applyMode(style.x),
                  opacity: opacity ? style.x : 1,
                }}
              >
                {items[i].data}
              </div>
            ))}
          </Wrap>
        )}
      </StaggeredMotion>
    );
  }
}

if (process.env.NODE_ENV !== 'production') {
  StaggeredScale.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape),
    in: PropTypes.bool,
    wrapperStyle: PropTypes.arrayOf(PropTypes.any),
    motion: PropTypes.objectOf(PropTypes.number),
    mode: PropTypes.string,
    opacity: PropTypes.bool,
  };
}

StaggeredScale.defaultProps = {
  items: [],
  in: false,
  wrapperStyle: [],
  motion: { stiffness: 120, damping: 9 },
  mode: 'SCALE',
  opacity: false,
};

export default StaggeredScale;
