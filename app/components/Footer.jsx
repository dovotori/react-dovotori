import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Border = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: ${p => p.theme.gradient2};
  z-index: 11;
`;

const Wrap = styled.div`
  padding: 4px;
  background: ${p => p.theme.gradient2};
`;

const P = styled.p`
  font-size: 0.7em;
  text-align: right;
  color: ${p => p.theme.grey};
`;

class Footer extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <div className="footer">
        <Wrap>
          <P>cc commons</P>
        </Wrap>
        <Border />
      </div>
    );
  }
}

if (process.env.NODE_ENV !== 'production') {
  Footer.propTypes = {};
}

Footer.defaultProps = {};

export default Footer;
