import React, { Fragment } from "react";
import { string, func, bool, number } from "prop-types";

import { buttonTypes } from "@enums";
import { SvgIcon } from "@common";
import { If } from "@utils";

import { trackEvent } from "src/modules/Tracking";
import Tooltip from "src/modules/Tooltip";

import { Touchable, IconWrapper } from "./Button.styles";

const Button = ({
  onPress,
  value,
  disabled,
  buttonType,
  loading,
  imgSrc,
  imgWidth,
  imgColor,
  action,
  popupText,
  id,
  ...props
}) => {
  if (id && id.includes("show_docs")) {
    return (
      <Fragment>
        <span data-tip={popupText}>
          <Touchable
            onClick={trackEvent(action, onPress)}
            disabled={loading || disabled}
            buttonType={buttonType}
            id={id}
            {...props}
          >
            <Tooltip html place="top" effect="solid" />
            <span>{loading ? "Carregando" : value}</span>
            <If test={imgSrc}>
              <IconWrapper size={imgWidth} disabled={disabled}>
                <If test={imgColor}>
                  <SvgIcon name={imgSrc} size={imgWidth} fill={imgColor} />
                </If>
                <If test={!imgColor}>
                  <SvgIcon name={imgSrc} size={imgWidth} />
                </If>
              </IconWrapper>
            </If>
          </Touchable>
        </span>
      </Fragment>
    );
  }
  return (
    <Fragment>
      <span data-tip={popupText}>
        <Touchable
          onClick={trackEvent(action, onPress)}
          disabled={loading || disabled}
          buttonType={buttonType}
          id={id}
          {...props}
        >
          <Tooltip html place="top" effect="solid" />
          <If test={imgSrc}>
            <IconWrapper size={imgWidth} disabled={disabled}>
              <If test={imgColor}>
                <SvgIcon name={imgSrc} size={imgWidth} fill={imgColor} />
              </If>
              <If test={!imgColor}>
                <SvgIcon name={imgSrc} size={imgWidth} />
              </If>
            </IconWrapper>
          </If>
          <span>{loading ? "Carregando" : value}</span>
        </Touchable>
      </span>
    </Fragment>
  );
};

Button.propTypes = {
  value: string,
  buttonType: string,
  disabled: bool,
  loading: bool,
  onPress: func,
  imgSrc: string,
  imgWidth: number,
  imgColor: string,
  action: string,
  popupText: string,
  id: string,
};

Button.defaultProps = {
  value: "",
  buttonType: buttonTypes.primary,
  disabled: false,
  loading: false,
  onPress: () => null,
  imgSrc: undefined,
  imgWidth: 16,
  imgColor: null,
  action: null,
  popupText: null,
  id: null,
};

export default Button;
