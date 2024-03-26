import React from "react";
import { Row, Col } from "react-styled-flexboxgrid";
import {
  FooterCol,
  FooterRow,
  Text,
  TextHeader,
  Attendance,
  Sac,
  Ombudsman,
  AttendanceText,
  AttendanceCol,
  Line,
  Copyright,
  SantanderDiv,
  Icon,
} from "./Footer.styles";

const Footer = () => (
  <FooterRow>
    <FooterCol xsOffset={2} xs={10}>
      <Row>
        <Col xs={12}>
          <AttendanceText>Atendimento</AttendanceText>
        </Col>
      </Row>
      <Row>
        <AttendanceCol xs={12} md={6}>
          <Icon name="attendance" /> Atendimento on-line
        </AttendanceCol>
        <SantanderDiv xs={12} md={6}>
          Uma empresa <Icon name="macnabank" />
        </SantanderDiv>
      </Row>
      <Row>
        <Col xs={12}>
          <Attendance>
            <Icon name="telphone" />
            <TextHeader>Atendimento: (11) 3456 0909</TextHeader>
            <Text>
              Disponível de segunda a sexta-feira das 8:00 as 20:00 horas,
              exceto em feriados nacionais.
            </Text>
          </Attendance>
          <Sac>
            <TextHeader>SAC: 0800 762 7777</TextHeader>
            <Text>Disponível 24 horas por dia, 7 dias por semana.</Text>
          </Sac>
          <Ombudsman>
            <TextHeader>OUVIDORIA: 0800 726 0322</TextHeader>
            <Text>
              Disponível de segunda a sexta-feira, das 9h às 18h, exceto
              feriados.
            </Text>
          </Ombudsman>
        </Col>
      </Row>
    </FooterCol>
    <Col xs={12}>
      <Line />
      <Copyright>
        <Text>Copyright Grupo macnabank© 2018</Text>
        <Text>
          For permission to reprint articles from this site, please contact:
          mac@comvc.com.br
        </Text>
      </Copyright>
    </Col>
  </FooterRow>
);

export default Footer;
