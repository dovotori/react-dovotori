import React, { Component } from "react";

class Bloc extends Component {
  shouldComponentUpdate() {
    return false;
  }
  render() {
    return (
      <div
        className={this.props.className}
        ref={d => {
          if (d === null) {
            window.scrollTo(0, 0);
          }
        }}
      >
        {this.props.children}
      </div>
    );
  }
}

export default Bloc;
