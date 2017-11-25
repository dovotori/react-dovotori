import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Motion, StaggeredMotion, spring } from 'react-motion';

const Wrap = styled.div`
${p => p.wrapstyle}
`;
class HandlerScale extends Component {
  constructor(props) {
    super(props);
    this.getInterpolatedStyle = this.getInterpolatedStyle.bind(this);
    this.getItemDefaultStyle = this.getItemDefaultStyle.bind(this);
    this.getItemTargetStyle = this.getItemTargetStyle.bind(this);
    this.getFinaleItemStyle = this.getFinaleItemStyle.bind(this);
    this.applyMode = this.applyMode.bind(this);
    this.isAnimeAll = true;
  }

  componentWillReceiveProps(newProps) {
    this.isAnimeAll = newProps.in !== this.props.in;
  }

  // shouldComponentUpdate(newProps) {
  //   return this.props.items.length !== newProps.items.length
  //     || this.props.in !== newProps.in;
  // }

  getInterpolatedStyle(prevInterpolatedStyles) {
    const isIn = this.props.in;
    return prevInterpolatedStyles.map((_, i) => {
      const target = isIn ? 1 : 0;
      return i === 0
        ? { x: spring(target, this.props.motion) }
        : { x: spring(prevInterpolatedStyles[i - 1].x, this.props.motion) };
    });
  }

  getItemDefaultStyle(idx) {
    const { items } = this.props;
    if (this.isAnimeAll) {
      return { x: items[idx].in ? 0 : 1 };
    }
    return { x: items[idx].in ? 0 : 1 };
  }

  getItemTargetStyle(idx) {
    const { items } = this.props;
    if (this.isAnimeAll) {
      return { x: items[idx].in ? 1 : 0 };
    }
    return { x: items[idx].in ? spring(1, this.props.motion) : spring(0, this.props.motion) };
  }

  getFinaleItemStyle(idx, staggerStyle, interpolatingStyle) {
    if (this.isAnimeAll) {
      const { items } = this.props;
      return items[idx].in ? staggerStyle.x : 0;
    }
    return interpolatingStyle.x;
  }

  applyMode(x) {
    switch (this.props.mode) {
      case 'SCALE': default:
        return `scale(${x})`;
      case 'TRANSLATE-RIGHT':
        return `translateX(${100 - (x * 100)}%)`;
      case 'TRANSLATE-LEFT':
        return `translateX(${-100 + (x * 100)}%)`;
    }
  }

  render() {
    const { items, wrapperStyle } = this.props;
    const defaultStyles = this.props.in
      ? items.map(() => ({ x: 0 }))
      : items.map(() => ({ x: 1 }));

    return (
      <StaggeredMotion
        defaultStyles={defaultStyles}
        styles={this.getInterpolatedStyle}
      >
        {staggerStyles => (
          <Wrap wrapstyle={wrapperStyle}>
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
                      transform: this.applyMode(
                        this.getFinaleItemStyle(idx, staggerStyle, interpolatingStyle),
                      ),
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
    wrapperStyle: PropTypes.arrayOf(PropTypes.any),
    motion: PropTypes.objectOf(PropTypes.number),
    mode: PropTypes.string,
  };
}

HandlerScale.defaultProps = {
  items: [],
  in: false,
  wrapperStyle: [],
  motion: { stiffness: 120, damping: 9 },
  mode: 'SCALE',
};

export default HandlerScale;
