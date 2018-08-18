import { connect } from "react-redux";

import Project from "../components/Project";

const getEntry = (entries, slug) =>
  entries.filter(entry => entry.slug === slug);

const mapStateToProps = (state, props) => {
  const slug = props.match.params.slug || null;
  const entry = getEntry(state.content.entries, slug)[0] || null;
  return {
    entry,
    isTouchDevice: state.device.isTouch
  };
};

export default connect(mapStateToProps)(Project);
