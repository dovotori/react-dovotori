import { Component } from "react";

export default class extends Component {
  componentWillUpdate(newProps) {
    if (newProps.location.pathname !== this.props.location.pathname) {
      window.setTimeout(() => {
        window.scrollTo(0, 0);
      }, 500);
    }
  }

  render() {
    return null;
  }
}
