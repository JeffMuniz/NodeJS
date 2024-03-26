import styled from "styled-components";
import { Button as CommonButton } from "@common";

import { blue } from "@colors";

export const Button = styled(CommonButton)`
  height: 50px;
  width: ${props => props.width || "330px"};
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 30px;
`;

export const Content = styled.div`
  margin: 0 90px;
`;

export const ContentBody = styled.div`
  display: flex;
`;

export const ContentModal = styled.div`
  text-align: center;
`;

export const ErrorMessage = styled.div`
  display: flex;
  justify-content: center;
  color: red;
  padding: 20px;
`;

export const Field = styled.div`
  display: flex;
  justify-content: space-between;
  line-height: 30px;
  font-size: 14px;
  border-bottom: ${props =>
    props.isDotted ? ".15rem dotted" : props.withDivisor && "1px solid"};
  border-bottom-color: #ccc;
  margin-bottom: ${props =>
    props.addSeparationArea
      ? "40px"
      : props.withDivisor && props.isDotted && "10px"};
`;

export const FieldLabel = styled.div`
  font-weight: ${props => (props.isBold || props.isLink) && "bold"};
  color: ${props => props.isLink && blue};
  cursor: ${props => props.isLink && "pointer"};
`;

export const FieldValue = styled.div`
  font-size: 15px;
  font-weight: ${props => props.isBold && "bold"};
`;

export const Footer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
`;

export const PaymentCard = styled.div`
  background-color: white;
  height: 70px;
  border-radius: 0.7rem;
  box-shadow: 1px 4px 4px rgba(0, 0, 0, 0.3);
  border: 1px solid #ccc;
  display: flex;
  align-items: center;
  padding-left: 20px;
  margin-bottom: 15px;
`;

export const PaymentModes = styled.div`
  flex: 1;
`;

export const SubTitle = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 15px;
`;

export const Summary = styled.div`
  flex: 1;
  padding-right: 150px;
`;

export const Text = styled.div`
  margin-top: 15px;
`;
