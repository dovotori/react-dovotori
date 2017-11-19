// import React, { Component } from 'react';
import React, { Component, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const StyledTG = styled(TransitionGroup)`
  .fade-enter {
    opacity: 0.01;
  }

  .fade-enter.fade-enter-active {
    opacity: 1;
    transition: opacity 500ms ${p => p.theme.elastic};
  }

  .fade-exit {
    opacity: 1;
  }

  .fade-exit.fade-exit-active {
    opacity: 0.01;
    transition: opacity 500ms ${p => p.theme.elastic};
  }

  .in.fade-enter,
  .out.fade-enter,
  .in.fade-exit,
  .out.fade-exit {
    display: block;
  }

  .out {
    display: none;
  }
`;

const Fade = ({ ins, children }) => {
  console.log('fade', ins);
  return (
    <CSSTransition in={ins} timeout={500} classNames="fade" className={ins ? 'in' : 'out'}>
      {/* <div>
        {Children.map(props.children, child =>
          cloneElement(child, {
            in: props.in,
          }),
        )}
      </div> */}
      {children}
    </CSSTransition>
  );
};

if (process.env.NODE_ENV !== 'production') {
  Fade.propTypes = {
    children: PropTypes.node,
    in: PropTypes.bool,
  };
}

Fade.defaultProps = {
  children: null,
  in: false,
};

class TransitionFader extends Component {
  // shouldComponentUpdate(newProps) {
  //   return newProps.in !== this.props.in;
  // }

  render() {
    console.log('tg', this.props.in);
    return (
      <StyledTG className={this.props.className}>
        {/*this.props.in && (
          <Fade>
            {this.props.children}
          </Fade>
        )} */}
        <Fade ins={this.props.in}>
          {this.props.children}
        </Fade>
      </StyledTG>
    );
  }
}

if (process.env.NODE_ENV !== 'production') {
  TransitionFader.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    in: PropTypes.bool,
  };
}

TransitionFader.defaultProps = {
  children: null,
  className: '',
  in: false,
};

export default TransitionFader;
