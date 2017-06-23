import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const H5 = styled.h5`
  font-weight: 100;
  color: ${props => props.theme.grey};
  letter-spacing: 0.5em;
  text-transform: uppercase;
  font-smoothing: antialiased;
`;

class TeaserItemComponent extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    const {
      className,
      entry,
    } = this.props;
    return (
      <Link to={`/view/${entry.slug}`}>
        <div className={className}>
          <div className="infos">
            <H5>{entry.title}</H5>
            <p>{entry.date}</p>
          </div>
          <div className="losange">
            <div className="los1">
              <img src="" alt="" width="255" height="320" />
            </div>
          </div>
        </div>
      </Link>
    );
  }
}

TeaserItemComponent.propTypes = {
  className: PropTypes.string,
  entry: PropTypes.shape({
    id: PropTypes.number,
    slug: PropTypes.string,
    title: PropTypes.string,
    category: PropTypes.number,
    tags: PropTypes.array,
    date: PropTypes.number,
    description: PropTypes.string,
  }),
};

TeaserItemComponent.defaultProps = {
  className: '',
  entry: {},
};

const TeaserItem = styled(TeaserItemComponent)`
position: relative;
margin: 10px 0;
.infos {
  position: absolute;
  left: calc(50% + 60px);
  top: 50%;
  z-index: 2;

  p {
    font-family: Monaco, "DejaVu Sans Mono", "Lucida Console", "Andale Mono", monospace;
    font-size: 9px;
    color: ${props => props.theme.primaryColor};
  }
}
.losange,
.losange div {
  margin: 0 auto;
  transform-origin: 50% 50%;
  overflow: hidden;
  width: 70px;
  height: 70px;
  cursor: pointer;
}
.losange {
  z-index: 1;
  background-color: ${props => props.theme.grey};
  border-color: ${props => props.theme.primaryColor};
  border-width: 1px;
  border-style: solid;
  transform: rotate(45deg) translateY(10px) scale(1);
  transition: border-width 200ms ease-out, transform 200ms ease-out, box-shadow 200ms ease-out;
  box-sizing: content-box;
  box-shadow: 0 0 0 0 #aaaaaa;
}
.losange .los1 {
  transform: rotate(-45deg) translateY(-74px);
}
.losange img {
  width: 100%;
  height: auto;
  background-color: #f00;
}
&:hover {
  .losange {
    transform: rotate(45deg) translateY(10px) scale(1.2);
    border-width: 40px;
    box-shadow: 40px 40px 4px 4px #aaaaaa;
  }
}
`;

export default TeaserItem;
