import styled from "styled-components";

import { Button as DefaultButton, LinkButton } from "@common";
import { blue, red } from "@colors";

export const Button = styled(DefaultButton)`
  padding: 0;
`;

export const ButtonLink = styled(LinkButton)``;

export const fileInput = {
  display: "none",
};

export const ContainerButtons = styled.div`
  display: flex;
  justify-content: space-between;
  width: 300px;
`;

export const GridContainer = styled.div`
  margin-top: 50px;
`;

export const IconWrapper = styled.div`
  align-items: center;
  display: -webkit-inline-box;
  margin: 0px 7px;
  -webkit-box-pack: center;
  -webkit-box-align: center;
`;

export const LabelRedirect = styled.label`
  font-weight: 700;
  line-height: normal;
  font-size: 14px;
  letter-spacing: -0.3px;
  text-transform: uppercase;
  color: ${red};
  display: inline-flex;
  margin: 0;
  border: none;
  cursor: pointer;
  background: transparent;
`;

export const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  height: 100%;
  width: 100%;
`;

export const TemplateText = styled.a`
  padding: 0;
  cursor: pointer;
  color: ${blue};
  font-weight: 700;
  font-size: 16px;
  margin-left: 4px;
`;
