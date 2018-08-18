import { connect } from "react-redux";

import TeasersList from "../components/TeasersList";

const mapStateToProps = state => ({
  entries: state.content.entries,
  isTouchDevice: state.device.isTouch
});

export default connect(mapStateToProps)(TeasersList);
