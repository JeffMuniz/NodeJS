import styled from "styled-components";

import { lighterBlack, blue } from "@colors";

export const SubTitle = styled.h2`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 26px;
  margin: 27px 0px 10px 0px;
  letter-spacing: 0.1px;
  color: ${lighterBlack};
`;

export const Wrapper = styled.div``;

export const WrapperValues = styled.div`
  display: flex;
  flex-direction: row;
  padding-top: 5px;

  div {
    margin-right: 44px;
  }

  input {
    width: 271px;
    height: 40px;
  }
`;

export const ReplicateText = styled.span`
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 24px;
  color: ${blue};
  cursor: pointer;
`;

export const VerifyTitle = styled.h1`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 26px;
  letter-spacing: 0.1px;
  margin-top: 39px;

  color: ${lighterBlack};
`;
