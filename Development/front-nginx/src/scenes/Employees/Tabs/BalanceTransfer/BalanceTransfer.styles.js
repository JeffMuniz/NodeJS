import styled from "styled-components";
import { veryLightBlack, blue } from "@colors";

const PBase = styled.p`
  font-style: normal;
  letter-spacing: 0.1px;
  font-weight: normal;
  margin-top: 1em;
  margin-bottom: 1em;
`;

export const Container = styled.section`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const Relative = styled.div`
  position: relative;
`;

export const Main = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;

  &:first-child {
    padding-right: 2em;
  }
`;

export const Title = styled.span`
  font-weight: bold;
  font-size: 18px;
  letter-spacing: -0.3px;
  color: ${veryLightBlack};
`;

export const SwitchContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1em;
`;

export const Text = styled(PBase)`
  line-height: 16px;
  font-size: 14px;
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 97%;
  margin-top: 1em;
`;

export const InputContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

export const InputWrapper = styled.div`
  display: flex;
  align-items: center;

  > span {
    margin-top: 10px;
    margin-right: 10px;
  }
`;

export const ButtonBalanceTransfer = styled.span`
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 24px;
  margin-right: 5px;

  color: ${blue};
  cursor: pointer;
`;

export const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;

  > p {
    margin-bottom: 2px;
  }
`;
