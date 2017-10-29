import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import ButtonBack from './ButtonBack';
import { AnimComponent } from './RouteAnimation';

const Styled = styled(AnimComponent).attrs({
  className: 'view',
})`
  width: 100%;
  text-align: center;
`;

const Wrap = styled.div`
  margin: 10%;
`;

const H1 = styled.h1`
  width: 100%;
  text-align: center;
  font-size: 3em;
  color: #fff;
  text-shadow: 2px 2px 0 ${p => p.theme.secondary};
  text-align: left;
  margin: 4% 0;
`;

const P = styled.p`
  text-align: left;
  font-size: 1em;
  color: ${p => p.theme.grey};
  padding: 4%;
  margin: 0;
  width: 50%;
  background-color: #fff;
  line-height: 1.6;
`;

class View extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    const {
      title,
      description,
    } = this.props.entry;
    const { nextSlug, previousSlug } = this.props;
    return (<Styled>
      <ButtonBack />
      <br />
      {previousSlug && <Link to={`/view/${previousSlug}`}>Previous</Link>}
      <br />
      {nextSlug && <Link to={`/view/${nextSlug}`}>Next</Link>}
      <Wrap>
        <H1>{title}</H1>
        <P>{description}</P>
      </Wrap>
    </Styled>);
  }
}

if (process.env.NODE_ENV !== 'production') {
  View.propTypes = {
    entry: PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
    }),
    nextSlug: PropTypes.string,
    previousSlug: PropTypes.string,
  };
}

View.defaultProps = {
  entry: {},
  previousSlug: null,
  nextSlug: null,
};

export default View;
