import React, { Component } from "react";
import {
  func,
  bool,
  arrayOf,
  shape,
  string,
  number,
  node,
  object,
  oneOfType,
  oneOf,
} from "prop-types";

import isEmpty from "lodash/isEmpty";
import { ClickabeIcon } from "@base";
import { buttonTypes } from "@enums";
import { If } from "@utils";

import {
  Container,
  Header,
  Title,
  TitleWrapper,
  Subtitle,
  ActionButtonsWrapper,
  Button,
  LoadingWrapper,
} from "./ContainerWrapper.styles";
import Loading from "./Loading";

export class ContainerWrapper extends Component {
  componentWillReceiveProps = prevProps => {
    const {
      handleCompanyIdUpdate,
      selectedGroup: { id: companyId },
    } = this.props;
    const {
      selectedGroup: { id: prevCompanyId },
    } = prevProps;
    if (prevCompanyId !== companyId) {
      handleCompanyIdUpdate();
    }
  };
  render() {
    const {
      showBackIcon,
      isBiggerTitle,
      isMediumTitle,
      isInsideAnother,
      headerClickHandler,
      actionButtons,
      title,
      subtitle,
      children,
      showHeaderBorder,
      extraComponent,
      loading,
    } = this.props;
    return (
      <Container isInsideAnother={isInsideAnother} id="container_wrapper">
        <Header
          id="container_wrapper_header"
          showHeaderBorder={showHeaderBorder}
          isInsideAnother={isInsideAnother}
        >
          <If test={title}>
            <TitleWrapper>
              <If test={showBackIcon}>
                <ClickabeIcon
                  src="arrowBack"
                  id="header_back_button"
                  alt="Voltar"
                  handleClick={headerClickHandler}
                  padding="0 20px 20px 0"
                  margin="0 42px 0 0"
                />
              </If>
              <Title
                isBiggerTitle={isBiggerTitle}
                isMediumTitle={isMediumTitle}
                id="container_wrapper_title"
              >
                {title}
              </Title>
              <If test={!isEmpty(actionButtons) && !loading}>
                <ActionButtonsWrapper isInsideAnother={isInsideAnother}>
                  {actionButtons.map(
                    ({
                      value,
                      imgSrc,
                      imgHeight,
                      imgWidth,
                      imgColor,
                      handleClick,
                      id,
                      disabled,
                    }) => (
                      <Button
                        key={value}
                        value={value}
                        imgSrc={imgSrc}
                        imgHeight={imgHeight}
                        imgWidth={imgWidth}
                        imgColor={imgColor}
                        onPress={handleClick}
                        id={id}
                        buttonType={buttonTypes.actionButton}
                        disabled={disabled}
                      />
                    ),
                  )}
                </ActionButtonsWrapper>
              </If>
            </TitleWrapper>
          </If>
          <If test={subtitle}>
            <Subtitle
              isVisible={!isEmpty(subtitle)}
              id="container_wrapper_subtitle"
            >
              {subtitle}
            </Subtitle>
          </If>
          <If test={!isEmpty(extraComponent)}>{extraComponent}</If>
        </Header>
        <If test={loading}>
          <LoadingWrapper>
            <Loading loading />
          </LoadingWrapper>
        </If>
        <If test={!loading}>{children}</If>
      </Container>
    );
  }
}

ContainerWrapper.propTypes = {
  loading: bool.isRequired,
  showBackIcon: bool,
  showHeaderBorder: bool,
  headerClickHandler: func,
  handleCompanyIdUpdate: func,
  isBiggerTitle: bool,
  isMediumTitle: bool,
  isInsideAnother: bool,
  actionButtons: arrayOf(
    shape({
      value: string,
      imgSrc: string,
      imgHeight: number,
      imgWidth: number,
      handleClick: func,
      id: string,
    }),
  ),
  title: string.isRequired,
  subtitle: oneOfType([string, object]),
  children: node.isRequired,
  selectedGroup: shape({
    id: number,
    name: string,
  }),
  extraComponent: oneOf([node, null]),
};

ContainerWrapper.defaultProps = {
  showBackIcon: false,
  isBiggerTitle: false,
  isMediumTitle: false,
  isInsideAnother: false,
  showHeaderBorder: false,
  actionButtons: [],
  subtitle: "",
  selectedGroup: {},
  headerClickHandler: () => {},
  handleCompanyIdUpdate: () => {},
  extraComponent: null,
};

export default ContainerWrapper;
