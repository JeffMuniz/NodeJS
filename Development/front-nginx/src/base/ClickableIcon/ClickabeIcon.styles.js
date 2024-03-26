import styled from "styled-components";

export const Button = styled.button`
  padding: ${({ padding }) => padding};
  margin: ${({ margin }) => margin};
  background-color: transparent;
  border-width: 0;
  outline: none;
  cursor: pointer;
`;

export const IconWrapper = styled.div`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  justify-content: center;
  align-items: center;
`;
