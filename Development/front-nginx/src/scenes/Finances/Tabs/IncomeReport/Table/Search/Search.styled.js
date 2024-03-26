import styled from "styled-components";
import { alto, white } from "@colors";

export const Container = styled.div`
  display: flex;
  align-items: center;
`;

export const Title = styled.h1`
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 23px;
  margin-right: 18px;
`;

export const InputWrapper = styled.div`
  background: ${white};
  border: 1px solid ${alto};
  border-radius: 4px;
  display: flex;
`;

export const StyledButton = styled.button`
  border: none;
  outline: none;
  cursor: pointer;
  background: transparent;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
`;

export const StyledInput = styled.input`
  border: none;
  padding: 0 0 0 20px;
  box-sizing: border-box;
  height: 40px;
  border-radius: 4px;
  width: 152px;
  outline: none;

  font-size: 14px;
  letter-spacing: 0.1px;
`;
