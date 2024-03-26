import styled from "styled-components";
import { Col } from "react-flexbox-grid";

export const Container = styled(Col)`
  text-align: ${props => props.align};
  padding: 0 32px !important;

  &:last-of-type {
    padding-right: 0px !important;
  }
`;

export const Title = styled.h1`
  font-weight: 300;
  font-size: 24px;
  line-height: 29px;
  text-transform: uppercase;
  margin: 0;
  font-family: Barlow, sans-serif;
`;

export const Subtitle = styled.p`
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
  text-transform: lowercase;
  margin: 0;
  font-family: Barlow, sans-serif;
`;

export const Paragraph = styled.p`
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  line-height: 21px;
  letter-spacing: 0.3px;
  font-family: Open Sans, serif;
`;
