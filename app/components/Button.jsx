import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

class ButtonComponent extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <button className={this.props.className}>
        {this.props.label}
        <span className="anim top" />
        <span className="anim bottom" />
        <span className="anim left" />
        <span className="anim right" />
      </button>
    );
  }
}

ButtonComponent.propTypes = {
  label: PropTypes.string,
  className: PropTypes.string,
};

ButtonComponent.defaultProps = {
  label: '',
  className: '',
};

const Button = styled(ButtonComponent)`
  background: transparent;
  border: solid 1px red;
  color: red;
  font-family: 'Helvetica';
  padding: 10px;
`;

export default Button;
