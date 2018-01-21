import { connect } from "react-redux";

import ListTeasers from "../components/ListTeasers";

const mapStateToProps = state => ({
  entries: state.content.entries,
  isTouchDevice: state.device.isTouch,
});

export default connect(mapStateToProps)(ListTeasers);
