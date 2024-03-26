import React from "react";
import { Row, Col } from "react-styled-flexboxgrid";

import { logoBanco } from "@assets";
import {
  FooterCol,
  FooterRow,
  Text,
  PhoneText,
  TextItalic,
  AttendanceText,
  AttendanceCol,
  Line,
  Copyright,
  SantanderDiv,
  IconCol,
  Icon,
  SmallGrayText,
} from "./Footer.styles";

const Footer = () => (
  <FooterRow>
    <FooterCol xs={12}>
      <Row>
        <Col xs={12} mdOffset={2} md={4}>
          <Row>
            <AttendanceCol xs={12}>
              <AttendanceText>Atendimento</AttendanceText>
            </AttendanceCol>
            <IconCol xs={2}>
              <Icon name="telephone" />
            </IconCol>
            <AttendanceCol xs={10}>
              <PhoneText>
                4004 4474 <small>(Capitais e Regiões Metropolitanas)</small>
              </PhoneText>
              <PhoneText>
                0800 723 4474 <small>(Demais localidades)</small>
              </PhoneText>
              <TextItalic>
                Disponível de segunda à sexta, das 8h às 20h, exceto em feriados
                nacionais.
              </TextItalic>
            </AttendanceCol>
            <AttendanceCol xs={10} xsOffset={2}>
              <div>
                <PhoneText>
                  <strong>SAC</strong>
                </PhoneText>
                <PhoneText>
                  0800 723 5013 <SmallGrayText>para todo brasil</SmallGrayText>
                </PhoneText>
                <PhoneText>
                  0800 723 5014{" "}
                  <SmallGrayText>
                    para deficientes auditivos e pessoas com disturbio de fala
                  </SmallGrayText>
                </PhoneText>
              </div>
            </AttendanceCol>
          </Row>
        </Col>
        <Col xs={12} md={3} mdOffset={1}>
          <Row>
            <SantanderDiv xs={12}>
              Uma empresa <img src={logoBanco} alt="macnabank" />
            </SantanderDiv>
          </Row>
        </Col>
      </Row>
    </FooterCol>
    <Col xs={12}>
      <Line />
      <Copyright>
        <Text>Copyright Grupo macnabank© 2018</Text>
      </Copyright>
    </Col>
  </FooterRow>
);

export default Footer;
