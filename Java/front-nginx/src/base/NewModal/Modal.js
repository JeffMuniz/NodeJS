import React from "react";
import { func, string, node, shape, oneOfType, bool } from "prop-types";
import { isFunction } from "lodash";
import { If } from "@utils";

import { buttonTypes } from "@enums";

import {
  Container,
  Content,
  Title,
  Subtitle,
  Footer,
  StyledButton,
} from "./Modal.styled";

const Modal = ({
  title,
  subtitle,
  children,
  cancelButtonProps,
  okButtonProps,
  width,
  id,
  height,
  maxHeight,
  padding,
  onContentBottomReach,
  contentHasScroll,
  isView,
  viewButtonProps,
}) => {
  const handleScroll = ({
    target: { scrollHeight, scrollTop, clientHeight },
  }) => {
    const bottom = scrollHeight - scrollTop - 1 <= clientHeight;

    if (bottom) {
      if (isFunction(onContentBottomReach)) {
        onContentBottomReach();
      }
    }
  };

  return (
    <Container
      width={width}
      height={height}
      maxHeight={maxHeight}
      padding={padding}
      id={id}
    >
      <Title id="modal-title">{title}</Title>
      {subtitle && <Subtitle id="modal-subtitle">{subtitle}</Subtitle>}
      <Content
        id="modal-content"
        contentHasScroll={contentHasScroll}
        onScroll={contentHasScroll ? handleScroll : null}
      >
        {children}
      </Content>
      <If test={isView}>
        <Footer id="modal-footer">
          <If test={viewButtonProps}>
            <StyledButton
              {...viewButtonProps}
              buttonType={buttonTypes.primary}
            />
          </If>
        </Footer>
      </If>
      <If test={!isView}>
        <Footer id="modal-footer">
          <If test={cancelButtonProps}>
            <StyledButton
              {...cancelButtonProps}
              buttonType={buttonTypes.light}
            />
          </If>
          <If test={okButtonProps}>
            <StyledButton {...okButtonProps} buttonType={buttonTypes.primary} />
          </If>
        </Footer>
      </If>
    </Container>
  );
};

const buttonCommonProps = {
  value: string.isRequired,
  onClick: func.isRequired,
  id: string.isRequired,
  disabled: bool,
};

Modal.propTypes = {
  title: string.isRequired,
  id: string.isRequired,
  onContentBottomReach: oneOfType([func, null]),
  subtitle: oneOfType([string, null]),
  children: node.isRequired,
  cancelButtonProps: shape(buttonCommonProps),
  okButtonProps: shape(buttonCommonProps),
  viewButtonProps: shape(buttonCommonProps),
  width: oneOfType([string, null]),
  height: oneOfType([string, null]),
  maxHeight: oneOfType([string, null]),
  padding: oneOfType([string, null]),
  contentHasScroll: bool,
  isView: bool,
};

Modal.defaultProps = {
  subtitle: null,
  cancelButtonProps: {},
  okButtonProps: {},
  viewButtonProps: {},
  width: null,
  height: null,
  maxHeight: null,
  padding: null,
  onContentBottomReach: null,
  contentHasScroll: false,
  isView: false,
};

export default Modal;
