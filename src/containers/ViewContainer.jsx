import React, { Component, cloneElement } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { TransitionMotion, spring } from "react-motion";

import View from "../components/View";
import { motion } from "../themes/theme";

class ViewContainer extends Component {
  shouldComponentUpdate(newProps) {
    return newProps.slug !== this.props.slug;
  }

  render() {
    const items = [];

    items.push({
      key: `view-${this.props.entry.slug}`,
      component: (
        <View
          entry={this.props.entry}
          isTouchDevice={this.props.isTouchDevice}
        />
      )
    });

    return (
      <TransitionMotion
        willEnter={() => ({ x: 1 })}
        willLeave={() => ({ x: spring(1, motion) })}
        styles={items.map(item => ({
          key: item.key,
          style: { x: spring(0, motion) },
          data: item.component
        }))}
      >
        {interpolatedStyles => (
          <div>
            {interpolatedStyles.map(config =>
              cloneElement(config.data, {
                x: config.style.x,
                key: config.key
              })
            )}
          </div>
        )}
      </TransitionMotion>
    );
    // return <View entry={this.props.entry} />;
  }
}

if (process.env.NODE_ENV !== "production") {
  ViewContainer.propTypes = {
    slug: PropTypes.string,
    entry: PropTypes.shape({
      slug: PropTypes.string,
      title: PropTypes.string,
      description: PropTypes.string,
      images: PropTypes.number,
      category: PropTypes.number,
      date: PropTypes.number
    }).isRequired,
    isTouchDevice: PropTypes.bool
  };
}

ViewContainer.defaultProps = {
  isTouchDevice: false,
  slug: ""
};

const getEntry = (entries, slug) =>
  entries.filter(entry => entry.slug === slug);

const mapStateToProps = (state, props) => ({
  entry: getEntry(state.content.entries, props.slug)[0],
  isTouchDevice: state.device.isTouch
});

export default connect(mapStateToProps)(ViewContainer);
