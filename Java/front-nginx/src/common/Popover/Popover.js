import React, { Fragment } from "react";
import PropTypes from "prop-types";

import { StyledPopover } from "./Popover.styles";

const Popover = props => {
  const {
    showPopover,
    title,
    description,
    preferPlace,
    place,
    onMouseOut,
    onMouseOver,
    onBlur,
    onFocus,
    id,
    children,
  } = props;
  return (
    <StyledPopover
      isOpen={showPopover}
      body={
        <Fragment>
          <h1>{title}</h1>
          <div>{description}</div>
        </Fragment>
      }
      preferPlace={preferPlace}
      place={place}
    >
      <div
        onMouseOut={onMouseOut}
        onMouseOver={onMouseOver}
        onBlur={onBlur}
        onFocus={onFocus}
        id={id}
      >
        {children}
      </div>
    </StyledPopover>
  );
};

Popover.defaultProps = {
  title: "",
  description: "",
};

Popover.propTypes = {
  children: PropTypes.node.isRequired,
  showPopover: PropTypes.bool.isRequired,
  preferPlace: PropTypes.string.isRequired,
  place: PropTypes.string.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  id: PropTypes.string.isRequired,
  onMouseOut: PropTypes.func.isRequired,
  onMouseOver: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
};

export default Popover;
