/* global window */
import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const View = styled.div`
  width: 100%;
`;

const Content = styled.div`
  width: 100%;
`;

function withView(ComponentToWrap) {
  class WithView extends Component {
    constructor(props) {
      super(props);
      this.place = this.place.bind(this);
      this.resize = this.resize.bind(this);

      this.view;
      this.content;
    }

    shouldComponentUpdate() {
      return false;
    }

    componentDidMount() {
      this.place();
      window.addEventListener('resize', this.resize, false);
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.resize, false);
    }

    place() {
      this.view.style.height = `${window.innerHeight}px`;
      const box = this.content.getBoundingClientRect();
      this.content.style.transform = `translateY(${window.innerHeight / 2 - (box.height / 2)}px)`;
    }

    resize() {
      this.place();
    }

    render() {
      return (<View innerRef={d => this.view = d}>
        <Content innerRef={d => this.content = d}>
          <ComponentToWrap />
        </Content>
      </View>);
    }
  }
  return WithView;
}

export default withView;
