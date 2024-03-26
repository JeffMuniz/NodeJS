import React from "react";
import PropTypes from "prop-types";
import { SvgIcon } from "@common";

import {
  ModalWrapper,
  ModalContainer,
  ModalHeader,
  ModalTitle,
  ModalCloseButton,
  ModalCloseIcon,
  ModalContent,
} from "./styles";

const SimpleModal = ({
  title,
  closeOnClickOutside,
  onClickCloseIcon,
  children,
  height,
  width,
  paddingless,
}) => (
  <ModalWrapper onClick={closeOnClickOutside ? onClickCloseIcon : null}>
    <ModalContainer
      onClick={event => event.stopPropagation()}
      height={height}
      width={width}
    >
      <ModalHeader>
        {!!title && <ModalTitle>{title}</ModalTitle>}
        <ModalCloseButton>
          <ModalCloseIcon onClick={onClickCloseIcon}>
            <SvgIcon name="close" />
          </ModalCloseIcon>
        </ModalCloseButton>
      </ModalHeader>
      <ModalContent
        hasTitle={!!title}
        height={height}
        paddingless={paddingless}
      >
        {children}
      </ModalContent>
    </ModalContainer>
  </ModalWrapper>
);

SimpleModal.propTypes = {
  title: PropTypes.string,
  onClickCloseIcon: PropTypes.func,
  children: PropTypes.node.isRequired,
  closeOnClickOutside: PropTypes.bool,
  height: PropTypes.string,
  width: PropTypes.string,
  paddingless: PropTypes.bool,
};

SimpleModal.defaultProps = {
  title: "",
  onClickCloseIcon: () => null,
  closeOnClickOutside: true,
  height: "",
  width: "",
  paddingless: false,
};

export default SimpleModal;
