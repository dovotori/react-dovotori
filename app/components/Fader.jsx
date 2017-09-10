import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CSSTransitionGroup } from 'react-transition-group';
import styled from 'styled-components';

class FaderComponent extends Component {
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
        transitionName="fader"
        transitionEnterTimeout={1000}
        transitionLeaveTimeout={1000}
        component="div"
      >
        { this.state.firstAppear ? null : this.props.children }
      </CSSTransitionGroup>
    );
  }
}

FaderComponent.propTypes = {
  children: PropTypes.element,
};

FaderComponent.defaultProps = {
  children: null,
};

const Fader = styled(FaderComponent)`
`;

export default Fader;
