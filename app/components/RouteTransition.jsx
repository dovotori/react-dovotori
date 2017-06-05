import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CSSTransitionGroup } from 'react-transition-group';
import styled from 'styled-components';

class RouteTransition extends Component {
  constructor(props) {
    super(props);
    this.state = { firstAppear: true, lastAppear: false };
  }

  componentDidMount() {
    this.setState({ firstAppear: false }); // eslint-disable-line
  }

  componentWillUnmount() {
    this.setState({ lastAppear: true }); // eslint-disable-line
  }

  render() {
    return (
      <CSSTransitionGroup
        transitionName="route"
        transitionEnterTimeout={1000}
        transitionLeaveTimeout={1000}
        component="div"
      >
        { this.state.firstAppear || this.state.lastAppear ? null : this.props.children }
      </CSSTransitionGroup>
    );
  }
}

RouteTransition.propTypes = {
  children: PropTypes.element,
};

RouteTransition.defaultProps = {
  children: null,
};

const Fader = styled(RouteTransition)`
`;

export default Fader;
