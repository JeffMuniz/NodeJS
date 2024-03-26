import styled from "styled-components";
import { black, shark } from "@colors";

export const WrapperCompany = styled.div`
  margin: 36px 27px;
  display: flex;
  flex-direction: column;
`;

export const CompanyTitle = styled.span`
  font-style: normal;
  font-weight: normal;
  font-size: 28px;
  line-height: 38px;

  color: ${black};
`;

export const CompanySubTitle = styled.span`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 19px;

  margin-top: 8px;

  color: ${shark};
`;

export const WrapperOrder = styled.div`
  header {
    margin-top: -18px;
  }
`;
