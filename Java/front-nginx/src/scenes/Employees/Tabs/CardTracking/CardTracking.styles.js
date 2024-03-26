import styled from "styled-components";
import { lighterBlack, veryLightBlack, shark, dustyGray } from "@colors";
import { ifStyle } from "@utils";

const isLoading = ifStyle("status");

export const Container = styled.div`
  min-height: 500px;
  flex: 1;
`;

export const PageTitle = styled.div`
  font-family: Barlow, sans-serif;
  font-weight: 600;
  line-height: 50px;
  font-size: 40px;
  letter-spacing: 0.3px;
  margin-top: 30px;
  color: ${lighterBlack};
`;

export const Text = styled.p`
  color: ${lighterBlack};
  line-height: 26px;
  font-size: 16px;
  letter-spacing: 0.1px;
  margin: 0 0 35px 0;
`;

export const Title = styled.span`
  font-weight: bold;
  font-size: 14px;
  letter-spacing: -0.3px;
  color: ${veryLightBlack};
`;

export const SuggestionItemEmployeeCPF = styled.span`
  font-size: 16px;
  letter-spacing: -0.342857px;
  color: ${dustyGray};
  font-weight: 600;

  b {
    color: ${shark};
  }
`;

export const SuggestionItemEmployeeName = styled.span`
  display: flex;
  font-size: 14px;
  letter-spacing: -0.342857px;
  color: ${dustyGray};
`;

export const LoadingWrapper = styled.div`
  height: 450px;
  display: ${isLoading("flex", "none")};
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

export const Loading = styled.div`
  height: 80px;
  width: 80px;
  display: ${isLoading("block", "none")};
`;
