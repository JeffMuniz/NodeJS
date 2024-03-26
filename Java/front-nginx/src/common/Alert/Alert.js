/* eslint-disable jsx-a11y/aria-props */
import React from "react";
import isEmpty from "lodash/isEmpty";
import { oneOfType, string, object, shape, number } from "prop-types";
import { If } from "@utils";
import { SvgIcon } from "@common";

import { WrapperAlert, WrapperTitle, Title, Description } from "./Alert.styles";

const Alert = ({ id, title, description, image, type, action, size }) => (
  <WrapperAlert type={type} id={id}>
    <WrapperTitle>
      <Title id={`${id}_title`} type={type}>
        <If test={image}>
          <If test={!size}>
            <SvgIcon id={`${id}_image`} name={image} />
          </If>
          <If test={size}>
            <SvgIcon id={`${id}_image`} name={image} size={size} />
          </If>
        </If>
        <span>{title}</span>
      </Title>
      <If test={description}>
        <Description id={`${id}_description`}>{description}</Description>
      </If>
    </WrapperTitle>
    {!isEmpty(action) && action}
  </WrapperAlert>
);

Alert.propTypes = {
  id: string,
  title: string,
  description: oneOfType([string, object]),
  image: string,
  type: string,
  action: shape({}),
  size: number,
};

Alert.defaultProps = {
  id: "alert",
  title: "",
  description: "",
  image: "",
  type: "",
  action: {},
  size: null,
};

export default Alert;
