import React from "react";
import styled from "styled-components";
import { Button } from "@common";
import { darkenGrey, grey, veryLightBlack } from "@colors";

export const ModalTitle = styled.div`
  padding: 10px 24px;
  display: block;
`;

export const Title = styled.h1`
  font-weight: 300;
  font-size: 32px;
  letter-spacing: 0.5px;
  margin-bottom: 2px;
`;

export const SubTitle = styled.h2`
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 24px;
  letter-spacing: 0.1px;
  color: ${grey};
  margin: 12px 0 0 0;
`;

export const ModalForm = styled.div`
  padding: 10px 24px;
  width: 500px;
`;

export const ActionButton = styled(props => <Button {...props} />)`
  cursor: pointer;
  width: 236px;
`;

export const SubmitButtonCol = styled.div`
  min-width: 226px;
`;

export const BottomWrapper = styled.div`
  margin-top: 35px;
  padding: 33px 46px;
  display: flex;
  align-content: center;
  justify-content: space-around;
  border-top: 1px solid ${darkenGrey};
`;

export const Info = styled.span`
  font-weight: normal;
  font-size: 16px;
  letter-spacing: 0.1px;
`;

export const SelectWrapp = styled.div`
  width: 70%;
  margin-bottom: 20px;

  div {
    border-radius: 8px;

    div > div .Select-option {
      height: 40px;
    }
  }
`;

export const InputTitle = styled.p`
  font-weight: bold;
  font-size: 14px;
  line-height: 19px;
  margin-bottom: 11px;
  color: ${veryLightBlack};
`;

export const InputError = styled.p`
  color: red;
  font-size: 16px;
`;
