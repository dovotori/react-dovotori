import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CSSTransitionGroup } from 'react-transition-group';

class Fader extends Component {
  constructor(props) {
    super(props);
    this.state = { firstAppear: true };
  }

  componentDidMount() {
    this.setState({ firstAppear: false }); // eslint-disable-line
  }

  render() {
    return (
      <CSSTransitionGroup
        transitionName="example"
        transitionEnterTimeout={1000}
        transitionLeaveTimeout={500}
      >
        { this.state.firstAppear ? null : this.props.children }
      </CSSTransitionGroup>
    );
  }
}

Fader.propTypes = {
  children: PropTypes.element,
};

Fader.defaultProps = {
  children: null,
};

export default Fader;
