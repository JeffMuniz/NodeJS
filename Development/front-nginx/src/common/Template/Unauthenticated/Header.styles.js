import styled from "styled-components";
import { green, shark, grey } from "@colors";

export const Container = styled.div`
  margin-bottom: 46px;
`;

export const ContainerTerm = styled.div`
  margin-bottom: 10px;
`;

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const TitleWrapperUpdate = styled.div`
  display: flex;
  align-items: center;
  padding-left: 35px;
`;

export const IconWrapper = styled.div`
  padding-right: 16px;
  cursor: pointer;
`;

export const Title = styled.h1`
  font-weight: bold;
  font-size: 56px;
  text-transform: lowercase;
  margin: 0 0 8px;
  padding: 0;
`;

export const TitleTerm = styled.h1`
  font-weight: bold;
  font-size: 44px;
  text-transform: lowercase;
  margin: 0 0 8px;
  padding: 0;
`;

export const GreenText = styled.h1`
  font-weight: 300;
  font-size: 32px;
  letter-spacing: 0.3px;
  color: ${green};
  padding: 0;
  margin: 0 0 40px 0px;
`;

export const GreyText = styled.h2`
  font-weight: 300;
  font-size: 27px;
  letter-spacing: 0.3px;
  color: ${grey};
  padding: 0;
  margin: 0 0 5px 42px;
`;

export const GreyTextUpdate = styled.h2`
  font-weight: 300;
  font-size: 27px;
  letter-spacing: 0.3px;
  padding: 0;
  margin: 10px 0 40px 42px;
`;

export const Text = styled.p`
  font-size: 18px;
  line-height: 160%;
  letter-spacing: 0.24px;
  color: ${shark};
  margin: 0;
`;
