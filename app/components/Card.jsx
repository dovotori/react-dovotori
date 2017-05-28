import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { css } from 'glamor';

const style = css({
});

class Card extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (<div
      {...style}
    >
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
