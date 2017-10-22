import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Border = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: ${p => p.theme.dark};
  border-top: solid 3px ${p => p.theme.primary};
`;

const Wrap = styled.div`
  width: 100%;
  background: ${p => p.theme.primary};
`;

const P = styled.p`
  text-align: right;
`;


class Footer extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (<div>
      <Wrap>
        <P>cc commons</P>
      </Wrap>
      <Border />
    </div>);
  }
}

if (process.env.NODE_ENV !== 'production') {
  Footer.propTypes = {
  };
}

Footer.defaultProps = {
};

export default Footer;
