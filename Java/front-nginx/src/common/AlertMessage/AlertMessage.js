import React from "react";
import { SvgIcon, Button } from "@common";
import { string, func, shape, number } from "prop-types";
import { If } from "@utils";
import { buttonTypes } from "@enums";
import {
  IconWrapper,
  Footer,
  Container,
  Title,
  Message,
} from "./AlertMessage.styles";

const AlertMessage = ({
  title,
  iconName,
  message,
  buttonAction,
  buttonText,
  btnProps,
  height,
  width,
  cancelBtnText,
  cancelBtnProps,
  cancelBtnAction,
}) => (
  <Container id="small_modal" width={width} height={height}>
    <IconWrapper iconName={iconName}>
      <SvgIcon name={iconName} />
    </IconWrapper>
    <Title iconName={iconName}>{title}</Title>
    <If test={message}>
      <Message>{message}</Message>
    </If>
    <If test={buttonText || cancelBtnText}>
      <Footer>
        <If test={cancelBtnText}>
          <Button
            id="action_btn_cancel"
            buttonType={buttonTypes.light}
            {...cancelBtnProps}
            value={cancelBtnText}
            onClick={cancelBtnAction}
          />
        </If>
        <If test={buttonText}>
          <Button
            id="action_btn"
            {...btnProps}
            value={buttonText}
            onClick={buttonAction}
          />
        </If>
      </Footer>
    </If>
  </Container>
);

AlertMessage.propTypes = {
  title: string.isRequired,
  iconName: string.isRequired,
  message: string,
  width: string,
  buttonAction: func,
  buttonText: string,
  btnProps: shape({}),
  height: number,
  cancelBtnText: string.isRequired,
  cancelBtnProps: shape({}),
  cancelBtnAction: func.isRequired,
};

AlertMessage.defaultProps = {
  width: "312px",
  message: undefined,
  buttonText: undefined,
  buttonAction: () => {},
  btnProps: {},
  height: null,
  cancelBtnProps: {},
};

export default AlertMessage;
