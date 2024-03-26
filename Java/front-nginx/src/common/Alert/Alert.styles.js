import styled from "styled-components";

import { darkGrey, persianRed, green } from "@colors";

export const WrapperAlert = styled.div`
  display: flex;
  align-items: center;
  min-height: 53px;
  margin-top: 20px;
  margin-bottom: 20px;
  border: 1px solid ${darkGrey};
  box-sizing: border-box;
  border-radius: 4px;
  padding: 16px 25px 16px 45px;
  justify-content: space-between;
`;

export const WrapperTitle = styled.div`
  display: flex;
  align-items: center;
`;

export const Title = styled.h6`
  display: flex;
  margin: 0;
  font-weight: bold;
  font-size: 14px;
  letter-spacing: 0.1px;
  text-transform: uppercase;
  white-space: nowrap;
  color: ${props => (props.type === "error" ? persianRed : green)};

  span,
  img {
    display: inline-block;
    vertical-align: middle;
  }

  img {
    width: 18px;
    height: auto;
  }

  span {
    margin-left: 29px;

    &:first-child {
      margin-left: 0;
    }
  }
  align-items: center;
`;

export const Description = styled.div`
  margin: 0;
  margin-left: 15px;
  font-size: 14px;

  p {
    margin: 0;
  }
`;
