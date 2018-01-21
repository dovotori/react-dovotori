import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import uiActions from "../actions/ui";

import ToggleLogo from "../components/ToggleLogo";

const mapStateToProps = state => ({
  isMenuOpened: state.ui.menuIsOpened,
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(uiActions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ToggleLogo);
