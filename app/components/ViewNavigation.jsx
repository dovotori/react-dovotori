import React, { Component } from 'react';
import { css } from 'styled-components';
import PropTypes from 'prop-types';

import HandlerScale from './HandlerScale';
import ButtonPicto from './ButtonPicto';

const wrapperStyle = css`
  display: flex;
  justify-content: flex-start;
`;

class ViewNavigation extends Component {
  shouldComponentUpdate(newProps) {
    return this.props.pathname !== newProps.pathname;
  }

  render() {
    const { nextSlug, previousSlug, pathname } = this.props;
    const isHome = pathname === '/';
    const items = [
      {
        key: 'back',
        data: <ButtonPicto
          key="/"
          link="/"
          useid="arrow-back"
          text="Back"
        />,
        in: true,
      },
      {
        key: 'previous',
        data: <ButtonPicto
          key={`/view/${previousSlug}`}
          link={`/view/${previousSlug}`}
          useid="arrow-previous"
          text="Previous"
        />,
        in: previousSlug,
      }, {
        key: 'next',
        data: <ButtonPicto
          key={`/view/${nextSlug}`}
          link={`/view/${nextSlug}`}
          useid="arrow-next"
          text="Next"
        />,
        in: nextSlug,
      },
    ];

    return (
      <HandlerScale
        items={items}
        in={!isHome}
        wrapperStyle={wrapperStyle}
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
  };
}

ViewNavigation.defaultProps = {
  previousSlug: null,
  nextSlug: null,
  pathname: null,
};

export default ViewNavigation;
