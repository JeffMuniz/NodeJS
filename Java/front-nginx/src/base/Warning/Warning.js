import React from "react";
import { string, func, shape, node, bool } from "prop-types";
import { isEmpty } from "lodash";

import { If } from "@utils";
import { SvgIcon } from "@common";
import { buttonTypes } from "@enums";
import { blue } from "@colors";

import {
  StyledGrid,
  IconWrapper,
  Icon,
  StyledButton,
  CloseBtnWrapper,
  Title,
  Content,
} from "./Warning.styles";

export const Warning = ({
  id,
  type,
  children,
  icon,
  button,
  hasCloseBtn,
  onClickCloseBtn,
  title,
}) => {
  const { backgroundColor, color } = type;

  return (
    <StyledGrid id={id} backgroundColor={backgroundColor} color={color}>
      <If test={hasCloseBtn}>
        <CloseBtnWrapper id="banner_close-btn" onClick={onClickCloseBtn}>
          <SvgIcon name="close" fill={blue} size={15} />
        </CloseBtnWrapper>
      </If>
      <IconWrapper>
        <Icon src={icon} />
      </IconWrapper>
      <Content>
        <If test={title && title.length}>
          <Title>{title}</Title>
        </If>
        {children}
      </Content>
      <If test={!isEmpty(button)}>
        <StyledButton
          id="warning_btn"
          type="button"
          buttonType={button.buttonType || buttonTypes.light}
          onPress={button.onClick}
          value={button.value}
        />
      </If>
    </StyledGrid>
  );
};

Warning.propTypes = {
  id: string.isRequired,
  title: string.isRequired,
  type: shape({}).isRequired,
  icon: string.isRequired,
  children: node,
  button: shape({
    value: string,
    onClick: func,
  }).isRequired,
  hasCloseBtn: bool.isRequired,
  onClickCloseBtn: func.isRequired,
};

Warning.defaultProps = {
  children: null,
};

export default Warning;
