/* global window */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Styled = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  margin: 10px;
  text-align: center;

  svg {
    display: inline-block;
    margin: 0 10px 0 0;
    fill: ${p => p.theme.tertiary};
  }
`;

class CenterToPage extends Component {
  constructor(props) {
    super(props);
    this.place = this.place.bind(this);
  }

  shouldComponentUpdate() {
    return false;
  }

  place(div) {
    var height = div.getBoundingClientRect().height;
    div.style.marginTop = `${(window.innerHeight / 2) - (height / 2)}px`;
  }

  render() {
    return (<div ref={this.place}>
      {this.props.children}
    </div>);
  }
}

CenterToPage.propTypes = {
  children: PropTypes.node,
};

CenterToPage.defaultProps = {
  children: null,
};

export default CenterToPage;