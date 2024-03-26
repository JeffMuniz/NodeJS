import React, { Component } from "react";
import { bool, func, number, string } from "prop-types";
import { navBarMenu } from "@enums";
import { If } from "@utils";
import { getPDFDocument } from "src/api/files/files";
import { getmacPortal } from "src/modules/UrlManager/UrlManager";
import { snakeCase } from "lodash";

import { WebPaths } from "src/routes/consts";

import { Icon } from "@common";
import {
  Nav,
  NavContainer,
  NavCol,
  NavRow,
  NavLinkStyled,
  activeLink,
  Avatar,
  DropDownCol,
  DropDownColNotification,
  CircleNotificationRed,
  ContainerNotification,
  ContainerDrop,
  DropDownWrapper,
  DownloadContract,
} from "./NavBar.styles";

import DropDown from "./DropDown/DropDown";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDownloadSuccess: false,
    };
    this.triggerRef = React.createRef();
  }

  componentWillUnmount() {
    this.setState({
      isDownloadSuccess: false,
    });
  }

  onClickDownloadContract = companySegment => {
    const urlSegment = this.checkSegmentCompany(companySegment);
    try {
      const fileName = `${snakeCase(
        `Contrato Atualizado ${companySegment}`,
      )}.pdf`;
      const url = `${getmacPortal()}${urlSegment}`;
      getPDFDocument({ url, fileName });
      // postNotificationContract();
      this.setState({ isDownloadSuccess: true });
    } catch (e) {
      this.setState({ isDownloadSuccess: true });
      // eslint-disable-next-line no-console
      console.log(e);
    }
  };

  checkSegmentCompany = companySegment => {
    const urlE1 = "static/pdf/ContratoServicoRH_RCN_20190110-E1.pdf";
    const urlE2 = "static/pdf/ContratoServicoRH_RCN_20190110-E2.pdf";
    const urlE3 = "static/pdf/ContratoServicoRH_RCN_20190110-E3.pdf";
    if (companySegment.includes("E1")) return urlE1;
    if (companySegment.includes("E2")) return urlE2;
    if (companySegment.includes("E3")) return urlE3;
  };

  render() {
    const {
      isAuthenticated,
      isDropDownOpen,
      isDropDownNotification,
      toggleDropDown,
      handleLogout,
      groupListLength,
      showChangeGroup,
      handleGroupModal,
      deliveryType,
      toggleNotification,
      isContractDownload,
      companySegment,
    } = this.props;

    const { isDownloadSuccess } = this.state;
    const isAuthIsContract = isContractDownload && !!isAuthenticated;

    if (isContractDownload && !!isAuthenticated && !isDownloadSuccess) {
      return (
        <Nav id="nav_navbar">
          <NavContainer>
            <NavRow middle="xs">
              <NavCol xs={1}>
                <Icon name="mac" />
              </NavCol>
              {isAuthenticated && (
                <NavCol xs={8}>
                  {navBarMenu.map(link => (
                    <If test={!link.hidden} key={link.route}>
                      <NavLinkStyled
                        id={`nav_link_${link.route}`}
                        to={WebPaths[link.route]}
                        activeStyle={activeLink}
                      >
                        {link.label}
                      </NavLinkStyled>
                    </If>
                  ))}
                </NavCol>
              )}
              <ContainerNotification xs={3}>
                <CircleNotificationRed onClick={toggleNotification}>
                  1
                </CircleNotificationRed>
                <DropDownColNotification
                  id="nav_link_notification"
                  onClick={toggleNotification}
                >
                  <Icon name="notification" />
                </DropDownColNotification>
                <DropDownCol id="nav_link_userData" onClick={toggleDropDown}>
                  <div ref={this.triggerRef}>
                    <Avatar>
                      <Icon name="person" />
                    </Avatar>
                  </div>
                </DropDownCol>
              </ContainerNotification>
            </NavRow>
            {isAuthenticated && (
              <DropDown
                deliveryType={deliveryType}
                isOpen={isDropDownOpen}
                handleClickOutside={toggleDropDown}
                triggerRef={this.triggerRef}
                handleLogout={handleLogout}
                groupListLength={groupListLength}
                showChangeGroup={showChangeGroup}
                handleGroupModal={handleGroupModal}
              />
            )}
            {isAuthIsContract && !isDownloadSuccess && (
              <DropDownWrapper isOpen={isDropDownNotification}>
                <p>Seu contrato foi atualizado </p>
                <DownloadContract
                  onClick={() => this.onClickDownloadContract(companySegment)}
                >
                  Clique aqui para atualizar
                </DownloadContract>
              </DropDownWrapper>
            )}
          </NavContainer>
        </Nav>
      );
    }
    return (
      <Nav id="nav_navbar">
        <NavContainer>
          <NavRow middle="xs">
            <NavCol xs={1}>
              <Icon name="mac" />
            </NavCol>
            {isAuthenticated && (
              <NavCol xs={9}>
                {navBarMenu.map(link => (
                  <If test={!link.hidden} key={link.route}>
                    <NavLinkStyled
                      id={`nav_link_${link.route}`}
                      to={WebPaths[link.route]}
                      activeStyle={activeLink}
                    >
                      {link.label}
                    </NavLinkStyled>
                  </If>
                ))}
              </NavCol>
            )}
            {isAuthenticated && (
              <ContainerDrop lg={2}>
                <DropDownCol id="nav_link_userData" onClick={toggleDropDown}>
                  <div ref={this.triggerRef}>
                    <Avatar>
                      <Icon name="person" />
                    </Avatar>
                  </div>
                </DropDownCol>
              </ContainerDrop>
            )}
          </NavRow>
          {isAuthenticated && (
            <DropDown
              deliveryType={deliveryType}
              isOpen={isDropDownOpen}
              handleClickOutside={toggleDropDown}
              triggerRef={this.triggerRef}
              handleLogout={handleLogout}
              groupListLength={groupListLength}
              showChangeGroup={showChangeGroup}
              handleGroupModal={handleGroupModal}
            />
          )}
          {isAuthIsContract && !isDownloadSuccess && (
            <DropDownWrapper isOpen={isDropDownNotification}>
              <p>Seu contrato foi atualizado </p>
              <DownloadContract
                onClick={() => this.onClickDownloadContract(companySegment)}
              >
                Clique aqui para atualizar
              </DownloadContract>
            </DropDownWrapper>
          )}
        </NavContainer>
      </Nav>
    );
  }
}

Navbar.propTypes = {
  isAuthenticated: bool.isRequired,
  handleLogout: func.isRequired,
  isContractDownload: bool,
  isDropDownOpen: bool,
  isDropDownNotification: bool,
  toggleDropDown: func,
  toggleNotification: func,
  groupListLength: number,
  showChangeGroup: bool,
  handleGroupModal: func,
  companySegment: string,
  deliveryType: string.isRequired,
};

Navbar.defaultProps = {
  isDropDownOpen: false,
  isDropDownNotification: false,
  isContractDownload: false,
  toggleDropDown: () => undefined,
  toggleNotification: () => undefined,
  groupListLength: 0,
  showChangeGroup: false,
  companySegment: null,
  handleGroupModal: () => null,
};

export default Navbar;
