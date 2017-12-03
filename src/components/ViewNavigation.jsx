import React, { Component } from 'react';
import { css } from 'styled-components';
import PropTypes from 'prop-types';

import HandlerScale from './HandlerScale';
import ButtonPicto from './ButtonPicto';

const wrapperStyle = css`
  display: flex;
  justify-content: flex-start;
`;

const itemStyle = css`
  min-width: 55px;
`;

class ViewNavigation extends Component {
  shouldComponentUpdate(newProps) {
    return (
      this.props.pathname !== newProps.pathname ||
      this.props.menuOpened !== newProps.menuOpened ||
      this.props.nextSlug !== newProps.nextSlug ||
      this.props.previousSlug !== newProps.previousSlug
    );
  }

  render() {
    const { nextSlug, previousSlug, menuOpened, pathname } = this.props;
    const items = [
      {
        key: 'back',
        data: <ButtonPicto key="/" link="/" useid="arrow-back" text="Back" />,
        in: true,
      },
      {
        key: 'previous',
        data: (
          <ButtonPicto
            key={previousSlug}
            link={previousSlug ? `/${previousSlug}` : null}
            useid="arrow-previous"
            text="Previous"
          />
        ),
        in: previousSlug !== null,
      },
      {
        key: 'next',
        data: (
          <ButtonPicto
            key={nextSlug}
            link={nextSlug ? `/${nextSlug}` : null}
            useid="arrow-next"
            text="Next"
          />
        ),
        in: nextSlug !== null,
      },
    ];

    return (
      <HandlerScale
        items={items}
        in={!menuOpened && pathname !== '/'}
        wrapperStyle={wrapperStyle}
        itemStyle={itemStyle}
        motion={{ stiffness: 300, damping: 40 }}
      />
    );
  }
}

if (process.env.NODE_ENV !== 'production') {
  ViewNavigation.propTypes = {
    nextSlug: PropTypes.string,
    previousSlug: PropTypes.string,
    pathname: PropTypes.string,
    menuOpened: PropTypes.bool,
  };
}

ViewNavigation.defaultProps = {
  previousSlug: null,
  nextSlug: null,
  pathname: null,
  menuOpened: false,
};

export default ViewNavigation;
