import React from "react";

const Bloc = props => (
  <div
    className={props.className}
    ref={d => {
      if (d === null) {
        window.scrollTo(0, 0);
      }
    }}
  >
    {props.children}
  </div>
);

export default Bloc;
