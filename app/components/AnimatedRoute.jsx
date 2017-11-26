import React, { Component } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledTransitionGroup = styled(TransitionGroup) `
  position: relative;
  width: 100%;
  height: calc(100% - 105px);
  bottom: 0;
  background: url('../assets/img/stripes.png') #fff repeat;
  box-shadow: 0 -10px 40px rgba(0, 0, 0, 0.4);
  overflow: hidden;

  ${p => p.theme.media.tablet`
    height: auto;
  `};
`;

const TIME = 1000;
// const EASE = 'ease-in-out';
// const EASE = 'ease-in';
// const EASE = 'cubic-bezier(.75,-0.5,0,1.75)';
// const EASE = 'cubic-bezier(.30,-0.3,0,1.30)';
const EASE = 'cubic-bezier(.34,1.72,.43,.99)';

export const styleRouteAnimation = `
  .home-enter,
  .home-exit,
  .view-home-enter,
  .view-home-exit,
  .view-view-enter,
  .view-view-exit {
    position: absolute;
    overflow-x: hidden;
    overflow-y: hidden;
  }

  .home-enter.home-enter-active,
  .home-exit.home-exit-active,
  .view-home-enter.view-home-enter-active,
  .view-home-exit.view-home-exit-active {
    transition: transform ${TIME}ms ${EASE};
  }

  .home-exit,
  .home-enter.home-enter-active,
  .view-home-exit,
  .view-home-enter.view-home-enter-active {
    transform: none;
  }

  .home-exit.home-exit-active,
  .home-enter {
    transform: translate3d(-100%, 0, 0);
  }

  .view-home-exit.view-home-exit-active,
  .view-home-enter {
    transform: translate3d(100%, 0, 0);
  }






  .view-view-enter.view-view-enter-active .slide-bottom,
  .view-view-exit.view-view-exit-active .slide-bottom {
    transition: transform ${TIME}ms ${EASE};
  }

  .view-view-enter .slide-bottom {
    transform: translateY(100%);
  }

  .view-view-enter.view-view-enter-active .slide-bottom {
    transform: none;
  }

  .view-view-exit .slide-bottom {
    transform: translateY(0);
  }

  .view-view-exit.view-view-exit-active .slide-bottom {
    transform: translateY(-100%);
  }





.view-view-enter.view-view-enter-active .description,
.view-view-exit.view-view-exit-active .description {
  transition: transform ${TIME}ms ${EASE};
}

.view-view-enter .description {
  transform: translateX(100%);
}

.view-view-enter.view-view-enter-active .description,
.view-view-exit .description {
  transform: none;
}

.view-view-exit.view-view-exit-active .description {
  transform: translateX(100%);
}






.view-view-enter.view-view-enter-active .date span,
.view-view-exit.view-view-exit-active .date span {
  transition: transform ${TIME}ms ${EASE}, opacity ${TIME}ms ${EASE};
}

.view-view-enter .date span {
  opacity: 0;
  transform: translateX(-100%);
}

.view-view-enter.view-view-enter-active .date span,
.view-view-exit .date span {
  transform: none;
  opacity: 1;
}

.view-view-exit.view-view-exit-active .date span {
  transform: translateX(-100%);
  opacity: 0;
}








.view-view-enter.view-view-enter-active .images,
.view-view-exit.view-view-exit-active .images {
  transition: transform ${TIME}ms ${EASE};
}

.view-view-enter .images {
  transform: translateX(100%);
}

.view-view-enter.view-view-enter-active .images,
.view-view-exit .images {
  transform: none;
}

.view-view-exit.view-view-exit-active .images {
  transform: translateX(100%);
}






.view-view-enter .view-navigation {
}

.view-view-exit .view-navigation {
  visibility: hidden;
  pointer-events: none;
}
`;

const Animation = props => (
  <CSSTransition
    {...props}
    timeout={TIME}
  />
);

class AnimatedRoute extends Component {
  constructor(props) {
    super(props);
    this.classNames = 'withHome';
    this.withHome = false;
    this.replaceClassName = this.replaceClassName.bind(this);
    this.removeEnterClassName = this.removeEnterClassName.bind(this);
  }

  componentWillReceiveProps(newProps) {
    this.withHome = this.props.locationKey === '/' || newProps.locationKey === '/';
  }

  replaceClassName(div) {
    if (div.className.indexOf('home ') !== -1) {
      div.setAttribute('class', div.className.replace(/disabled/g, 'home'));
    } else if (this.withHome) {
      div.setAttribute('class', div.className.replace(/disabled/g, 'view-home'));
    } else {
      div.setAttribute('class', div.className.replace(/disabled/g, 'view-view'));
    }
  }

  removeEnterClassName(div) {
    if (div.className.indexOf('home ') !== -1) {
      div.setAttribute('class', div.className.replace(' home-enter home-enter-active', ''));
    } else if (this.withHome) {
      div.setAttribute('class', div.className.replace(' view-home-enter view-home-enter-active', ''));
    } else {
      div.setAttribute('class', div.className.replace(' view-view-enter view-view-enter-active', ''));
    }
  }

  render() {
    return (
      <StyledTransitionGroup>
        <Animation
          key={this.props.locationKey}
          classNames="disabled"
          onEnter={this.replaceClassName}
          onExit={this.replaceClassName}
          onEntering={this.replaceClassName}
          onExiting={this.replaceClassName}
          onEntered={this.removeEnterClassName}
        >
          {this.props.children}
        </Animation>
      </StyledTransitionGroup>
    );
  }
}

if (process.env.NODE_ENV !== 'production') {
  AnimatedRoute.propTypes = {
    children: PropTypes.node,
    locationKey: PropTypes.string,
  };
}

AnimatedRoute.defaultProps = {
  children: null,
  locationKey: '',
};

export default AnimatedRoute;
