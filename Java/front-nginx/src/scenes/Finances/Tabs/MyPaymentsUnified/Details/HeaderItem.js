import React from "react";
import PropTypes from "prop-types";

import { Item, Label, Value } from "./styles";

const HeaderItem = ({
  boldLabel,
  boldValue,
  highlighted,
  label,
  marginLeft,
  marginTop,
  value,
  widthLabel,
  vertical,
  color,
}) => (
  <Item {...{ marginTop }}>
    <Label {...{ boldLabel, highlighted, widthLabel, vertical }}>{label}</Label>
    {value && (
      <Value {...{ boldValue, highlighted, marginLeft, vertical, color }}>
        {value}
      </Value>
    )}
  </Item>
);

HeaderItem.propTypes = {
  boldLabel: PropTypes.bool,
  boldValue: PropTypes.bool,
  highlighted: PropTypes.bool,
  label: PropTypes.string.isRequired,
  marginLeft: PropTypes.string,
  marginTop: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  widthLabel: PropTypes.bool,
  vertical: PropTypes.bool,
  color: PropTypes.string,
};

HeaderItem.defaultProps = {
  boldLabel: false,
  boldValue: false,
  highlighted: false,
  marginLeft: "",
  marginTop: "",
  value: "",
  widthLabel: false,
  vertical: false,
  color: "",
};

export default HeaderItem;
