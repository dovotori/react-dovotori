import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Card extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (<div>
      {this.props.label}
    </div>);
  }
}

Card.propTypes = {
  label: PropTypes.string,
};

Card.defaultProps = {
  label: '',
};

export default Card;
