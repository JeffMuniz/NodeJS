import React, { Fragment } from "react";
import {
  FooterContent,
  FooterH1,
  FooterImage,
  FooterInfo,
  FooterSocialMedia,
  FooterText,
} from "./Footer.styles";

const Footer = () => (
  <Fragment>
    <FooterContent>
      <FooterInfo>
        <FooterH1>mac macefícios e Serviços S.A.</FooterH1>
        <FooterText>
          Rua Amador Bueno, 474, Bloco I Andar 2 CEP 04752-901, São Paulo/SP •
          CNPJ/MF nº 30.798.783/0001-61
        </FooterText>
      </FooterInfo>
      <FooterSocialMedia />
    </FooterContent>
    <FooterImage />
  </Fragment>
);

export default Footer;
