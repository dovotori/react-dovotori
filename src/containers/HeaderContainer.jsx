import { connect } from "react-redux";

import Header from "../components/Header";

const mapStateToProps = state => ({
  isTouchDevice: state.device.isTouch
});

export default connect(mapStateToProps)(Header);
