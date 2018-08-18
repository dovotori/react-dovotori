import { connect } from "react-redux";

import Menu from "../components/Menu";

const mapStateToProps = state => ({
  isMenuOpened: state.ui.menuIsOpened,
  isTouchDevice: state.device.isTouch
});

export default connect(mapStateToProps)(Menu);
