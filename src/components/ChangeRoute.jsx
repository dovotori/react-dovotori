import { Component } from "react";
import { withRouter } from "react-router-dom";

class ChangeRoute extends Component {
  componentWillUpdate(newProps) {
    if (newProps.location.pathname !== this.props.location.pathname) {
    }
  }

  render() {
    return null;
  }
}

export default withRouter(ChangeRoute);
