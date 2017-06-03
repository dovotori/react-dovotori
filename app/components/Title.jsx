import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Title extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (<h1>
      {this.props.label}
    </h1>);
  }
}

Title.propTypes = {
  label: PropTypes.string,
};

Title.defaultProps = {
  label: '',
};

export default Title;
