import styled from "styled-components";

import { darkGrey, red } from "@colors";

import { Button } from "@common";

export const ColWrapper = styled.div`
  width: ${props => (props.width ? props.width : "100%")};
`;

export const ContainerFlex = styled.div`
  display: flex;
  align-items: ${props => props.alignItems && "baseline"};
  justify-content: ${props =>
    props.justifyContent ? props.justifyContent : "space-between"};
  margin: ${props => props.margin && "0 20px"};
`;

export const ContainerCol = styled.div`
  width: 45%;
  min-width: 250px;
`;

export const Form = styled.form`
  overflow-x: scroll;
  overflow: auto;
`;

export const InformationInputText = styled.span`
  font-size: 12px;
  position: relative;
  bottom: 10px;
`;

export const InformationText = styled.div`
  color: ${red};
  display: flex;
  font-size: 12px;
  font-style: italic;
  justify-content: flex-end;
`;

export const AlertText = styled(InformationInputText)`
  color: ${red};
  bottom: 25px;
`;

export const Separator = styled.div`
  background-color: ${darkGrey};
  height: 1px;
  margin-bottom: ${props => props.marginBottom};
  margin-top: ${props => props.marginTop};
  width: 100%;
`;

export const StyledButton = styled(Button)`
  width: 312px;
  height: 48px;
  margin-top: 40px;
  margin-right: ${props => props.marginRight && "15px"};
`;

export const Text = styled.div`
  font-weight: bold;
  font-size: 20px;
  line-height: 26px;
  letter-spacing: 0.3px;
  margin-bottom: 20px;
`;

export const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  height: 100%;
  width: 100%;
`;
