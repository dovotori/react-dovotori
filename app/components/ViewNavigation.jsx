import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import StaggerScale from './StaggerScale';
import ButtonPicto from './ButtonPicto';

const Styled = styled.div.attrs({
  className: 'view-navigation',
})`
  display: flex;
  justify-content: flex-start;
`;

const Blank = styled.span`
  width: 50px;
  height: 50px;
  margin: 0 10px 0 0;
  opacity: 0;
`;


class ViewNavigation extends Component {
  shouldComponentUpdate(newProps) {
    return this.props.nextSlug !== newProps.nextSlug
      || this.props.previousSlug !== newProps.previousSlug;
  }

  render() {
    const { nextSlug, previousSlug } = this.props;

    const keys = ['/'];
    const items = [
      <ButtonPicto
        key="/"
        link="/"
        useid="arrow-back"
        text="Back"
      />,
    ];

    if (previousSlug) {
      keys.push(`/view/${previousSlug}`);
      items.push(
        <ButtonPicto
          key={`/view/${previousSlug}`}
          link={`/view/${previousSlug}`}
          useid="arrow-previous"
          text="Previous"
        />,
      );
    }
    // else {
    //   keys.push('blank');
    //   items.push(<Blank />);
    // }

    if (nextSlug) {
      keys.push(`/view/${nextSlug}`);
      items.push(
        <ButtonPicto
          key={`/view/${nextSlug}`}
          link={`/view/${nextSlug}`}
          useid="arrow-next"
          text="Next"
        />,
      );
    }

    return (
      <StaggerScale
        items={items}
        keys={keys}
        in
        WrapStyled={Styled}
        ItemStyled={Blank}
      />
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
