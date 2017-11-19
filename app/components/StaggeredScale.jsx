import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { StaggeredMotion, spring } from 'react-motion';

const Wrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

class StaggeredScale extends Component {
  constructor(props) {
    super(props);
    this.motion = { stiffness: 120, damping: 9 };
    this.setInterpolatedStyle = this.setInterpolatedStyle.bind(this);
  }

  setInterpolatedStyle(prevInterpolatedStyles) {
    const isIn = this.props.in;
    return prevInterpolatedStyles.map((_, i) => {
      const target = isIn ? 1 : 0;
      return i === 0
        ? { scale: spring(target, this.motion) }
        : { scale: spring(prevInterpolatedStyles[i - 1].scale, this.motion) };
    });
  }

  render() {
    const { items } = this.props;

    const defaultStyles = this.props.in
      ? items.map(() => ({ scale: 0 }))
      : items.map(() => ({ scale: 1 }));

    return (
      <StaggeredMotion
        defaultStyles={defaultStyles}
        styles={this.setInterpolatedStyle}
      >
        {interpolatingStyles => (
          <Wrap>
            {interpolatingStyles.map((style, i) => (
              <div
                key={items[i].key}
                style={{
                  transform: `scale(${style.scale})`,
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
  };
}

StaggeredScale.defaultProps = {
  items: [],
  in: false,
};

export default StaggeredScale;
