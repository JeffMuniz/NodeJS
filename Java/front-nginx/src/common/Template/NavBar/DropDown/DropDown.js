import React from "react";
import { oneOfType, func, shape, bool, number, string } from "prop-types";

import { WebPaths, Routes } from "src/routes/consts";
import { ClickOutsideListener } from "@common";
import { If } from "@utils";
import { dropDownMenu, deliveryTypes } from "@enums";

import {
  NavLinkStyled,
  DropDownWrapper,
  activeLink,
  BaseOption as LogoutOption,
  ChangeGroupOption,
} from "./DropDown.styles";

export const DropDown = ({
  triggerRef,
  isOpen,
  handleClickOutside,
  handleLogout,
  groupListLength,
  showChangeGroup,
  handleGroupModal,
  deliveryType,
}) => (
  <ClickOutsideListener
    id="ud_dropdown"
    handleClickOutside={handleClickOutside}
    isListening={isOpen}
    triggerRef={triggerRef}
  >
    <DropDownWrapper isOpen={isOpen}>
      {dropDownMenu
        .filter(link => {
          if (deliveryType === deliveryTypes.door2Door) {
            return link.route !== Routes.DELIVERY_PLACES;
          }

          return link;
        })
        .map(link => (
          <NavLinkStyled
            id={`ud_link_${link.route}`}
            key={link.route}
            exact
            onClick={handleClickOutside}
            to={WebPaths[link.route]}
            activeStyle={activeLink}
          >
            {link.label}
          </NavLinkStyled>
        ))}
      <If test={showChangeGroup}>
        <ChangeGroupOption onClick={handleGroupModal} id="btn_change_group">
          Trocar Grupo ({groupListLength})
        </ChangeGroupOption>
      </If>
      <LogoutOption id="logout_dropdown_button" onClick={handleLogout}>
        Sair
      </LogoutOption>
    </DropDownWrapper>
  </ClickOutsideListener>
);

export default DropDown;

DropDown.propTypes = {
  triggerRef: oneOfType([func, shape({})]).isRequired,
  isOpen: bool,
  handleClickOutside: func,
  handleLogout: func.isRequired,
  groupListLength: number,
  showChangeGroup: bool,
  handleGroupModal: func,
  deliveryType: string.isRequired,
};

DropDown.defaultProps = {
  isOpen: false,
  handleClickOutside: () => null,
  groupListLength: 0,
  showChangeGroup: false,
  handleGroupModal: () => null,
};
