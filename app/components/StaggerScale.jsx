import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StaggeredMotion, spring } from 'react-motion';

class StaggerScale extends Component {
  // shouldComponentUpdate(newProps) {
  //   return this.props.in !== newProps.in;
  // }

  render() {
    const { items, keys, WrapStyled, ItemStyled } = this.props;
    const motion = { stiffness: 120, damping: 9 };

    const getStyle = style => ({
      transform: `scale(${style.h})`,
      opacity: style.h,
    });

    const defaultStyles = this.props.in
      ? items.map(() => ({ h: 0 }))
      : items.map(() => ({ h: 1 }));

    return (
      <StaggeredMotion
        defaultStyles={defaultStyles}
        styles={prevInterpolatedStyles =>
          prevInterpolatedStyles.map((_, i) => {
            const target = this.props.in ? 1 : 0;
            return i === 0
              ? { h: spring(target, motion) }
              : { h: spring(prevInterpolatedStyles[i - 1].h, motion) };
          })
        }
      >
        {interpolatingStyles => (
          <WrapStyled>
            {interpolatingStyles.map((style, i) => (
              <ItemStyled
                key={keys[i]}
                style={getStyle(style)}
              >
                {items[i]}
              </ItemStyled>
            ))}
          </WrapStyled>
        )}
      </StaggeredMotion>
    );
  }
}

if (process.env.NODE_ENV !== 'production') {
  StaggerScale.propTypes = {
    items: PropTypes.arrayOf(PropTypes.node),
    keys: PropTypes.arrayOf(PropTypes.string),
    in: PropTypes.bool,
    WrapStyled: PropTypes.func.isRequired,
    ItemStyled: PropTypes.func.isRequired,
  };
}

StaggerScale.defaultProps = {
  items: [],
  keys: [],
  in: false,
};

export default StaggerScale;
