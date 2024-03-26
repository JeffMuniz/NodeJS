import React from "react";
import { func, string, node } from "prop-types";
import ScrollToTop from "src/common/Template/ScrollToTop/ScrollToTop";
import { IconArrowBack } from "@assets";
import { SvgIcon } from "@common";

import {
  Container,
  Title,
  TitleTerm,
  GreenText,
  GreyText,
  Text,
  TitleWrapper,
  IconWrapper,
  ContainerTerm,
  GreyTextUpdate,
  TitleWrapperUpdate,
} from "./Header.styles";

const Header = ({ goBack, title, subtitle, text, id }) => {
  const termPrivacy = id === "context-term-privacy";
  const updateUser = id === "context-update-user";
  if (termPrivacy) {
    return (
      <ScrollToTop>
        <ContainerTerm id="context-header-term">
          <div>
            <TitleWrapper>
              <IconWrapper onClick={goBack} id="btn-go-back">
                <SvgIcon icon={IconArrowBack} />
              </IconWrapper>
              <TitleTerm>{title}</TitleTerm>
            </TitleWrapper>
            <GreyText>{subtitle}</GreyText>
          </div>
          <Text>{text}</Text>
        </ContainerTerm>
      </ScrollToTop>
    );
  }

  if (updateUser) {
    return (
      <ScrollToTop>
        <ContainerTerm id="context-header-update">
          <div>
            <TitleWrapperUpdate>
              <TitleTerm>{title}</TitleTerm>
            </TitleWrapperUpdate>
            <GreyTextUpdate>{subtitle}</GreyTextUpdate>
          </div>
          <Text>{text}</Text>
        </ContainerTerm>
      </ScrollToTop>
    );
  }
  return (
    <ScrollToTop>
      <Container id="context-header">
        <div>
          <TitleWrapper>
            <Title>{title}</Title>
          </TitleWrapper>
          <GreenText>{subtitle}</GreenText>
        </div>
        <Text>{text}</Text>
      </Container>
    </ScrollToTop>
  );
};

Header.propTypes = {
  goBack: func.isRequired,
  title: string.isRequired,
  subtitle: string.isRequired,
  text: node.isRequired,
  id: string,
};

Header.defaultProps = {
  id: "",
};

export default Header;
