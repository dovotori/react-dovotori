import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Motion, StaggeredMotion, spring } from 'react-motion';

const Wrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

class HandlerScale extends Component {
  constructor(props) {
    super(props);
    this.motion = { stiffness: 120, damping: 9 };
    this.getInterpolatedStyle = this.getInterpolatedStyle.bind(this);
    this.getItemDefaultStyle = this.getItemDefaultStyle.bind(this);
    this.getItemTargetStyle = this.getItemTargetStyle.bind(this);
    this.getFinaleItemStyle = this.getFinaleItemStyle.bind(this);
    this.isAnimeAll = true;
  }

  componentWillReceiveProps(newProps) {
    this.isAnimeAll = newProps.in !== this.props.in;
    console.log('anime all', this.isAnimeAll);
  }

  getInterpolatedStyle(prevInterpolatedStyles) {
    const isIn = this.props.in;
    return prevInterpolatedStyles.map((_, i) => {
      const target = isIn ? 1 : 0;
      return i === 0
        ? { scale: spring(target, this.motion) }
        : { scale: spring(prevInterpolatedStyles[i - 1].scale, this.motion) };
    });
  }

  getItemDefaultStyle(idx) {
    const { items } = this.props;
    if (this.isAnimeAll) {
      return { scale: items[idx].in ? 0 : 1 };
    }
    return { scale: items[idx].in ? 0 : 1 };
  }

  getItemTargetStyle(idx) {
    const { items } = this.props;
    if (this.isAnimeAll) {
      return { scale: items[idx].in ? 1 : 0 };
    }
    return { scale: items[idx].in ? spring(1, this.motion) : spring(0, this.motion) };
  }

  getFinaleItemStyle(idx, staggerStyle, interpolatingStyle) {
    if (this.isAnimeAll) {
      const { items } = this.props;
      return items[idx].in ? staggerStyle.scale : 0;
    }
    return interpolatingStyle.scale;
  }

  render() {
    const { items } = this.props;

    const defaultStyles = this.props.in
      ? items.map(() => ({ scale: 0 }))
      : items.map(() => ({ scale: 1 }));

    return (
      <StaggeredMotion
        defaultStyles={defaultStyles}
        styles={this.getInterpolatedStyle}
      >
        {staggerStyles => (
          <Wrap>
            {staggerStyles.map((staggerStyle, idx) => (
              <Motion
                key={`${items[idx].key}-${items[idx].in ? 'in' : 'out'}`}
                defaultStyle={this.getItemDefaultStyle(idx)}
                style={this.getItemTargetStyle(idx)}
              >
                {interpolatingStyle => (
                  <div
                    key={`item-${items[idx].key}-${items[idx].in ? 'in' : 'out'}`}
                    style={{
                      transform: `scale(${this.getFinaleItemStyle(idx, staggerStyle, interpolatingStyle)})`,
                    }}
                  >
                    {items[idx].data}
                  </div>
                )}
              </Motion>
            ))}
          </Wrap>
        )}
      </StaggeredMotion>
    );
  }
}

if (process.env.NODE_ENV !== 'production') {
  HandlerScale.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape),
    in: PropTypes.bool,
  };
}

HandlerScale.defaultProps = {
  items: [],
  in: false,
};

export default HandlerScale;
