import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Styled = styled.div.attrs({
  className: 'view-navigation',
})`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 60px;

  a {
    position: relative;
    display: block;
    margin: 0 10px 0 0;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #fff;
    transition: box-shadow 1000ms ease-out;
    text-decoration: none;

    &:hover {
      box-shadow: 2px 2px 14px rgba(0,0,0,0.3);

      span {
        transform: none;
        opacity: 1;
      }

      svg {
        transform: translate3d(-50%, -50%, 0) scale(1);
      }
    }

    span {
      position: absolute;
      top: 120%;
      left: 40%;
      font-size: 0.7em;
      color: ${p => p.theme.grey};
      transition: transform 300ms ease-out, opacity 300ms ease-out;
      transform-origin: 0 0;
      transform: translate3d(-100%, 0, 0);
      opacity: 0;
      letter-spacing: 0.1em;
    }

    svg {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate3d(-50%, -50%, 0) scale(0.8);
      transition: transform 300ms ease-out;
      stroke: #000;
      fill: none;
    }
  }
`;


class ViewNavigation extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    const { nextSlug, previousSlug } = this.props;
    return (
      <Styled>
        <Link to="/">
          <span>Back</span>
          <svg width="20" height="10" viewport="0 0 10 10">
            <path d="M 10 0 L 0 5 L 10 10" />
            <path d="M 20 0 L 10 5 L 20 10" />
          </svg>
        </Link>
        {previousSlug && <Link to={`/view/${previousSlug}`}>
          <span>Previous</span>
          <svg width="10" height="10" viewport="0 0 10 10">
            <path d="M 10 0 L 0 5 L 10 10" />
          </svg>
        </Link>}
        {nextSlug && <Link to={`/view/${nextSlug}`}>
          <span>Next</span>
          <svg width="10" height="10" viewport="0 0 10 10">
            <path d="M 0 0 L 10 5 L 0 10" />
          </svg>
        </Link>}
      </Styled>
    );
  }
}

if (process.env.NODE_ENV !== 'production') {
  ViewNavigation.propTypes = {
    nextSlug: PropTypes.string,
    previousSlug: PropTypes.string,
  };
}

ViewNavigation.defaultProps = {
  previousSlug: null,
  nextSlug: null,
};

export default ViewNavigation;
