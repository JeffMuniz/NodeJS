import styled from "styled-components";
import { blue, persianRed, black } from "src/styles/colors";

export const StyledDate = styled.span`
  margin-top: 7px;
  line-height: 26px;
  font-size: 14px;
  letter-spacing: 0.1px;
  display: block;
  color: ${props => (props.changeColor ? persianRed : black)};
  font-weight: ${props => (props.changeColor ? 600 : "normal")};
`;

export const StyledLink = styled.span`
  display: block;
  color: ${blue};
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

export const StyledLinkNormal = styled(StyledLink)`
  margin-top: 45px;
`;

export const StyledDatePassword = styled(StyledDate)`
  color: ${persianRed};
  font-weight: 600;
  width: 315px;
`;

export const StyledLinkPassword = styled(StyledLink)`
  margin-top: 20px;
`;

export const StyledLinkBlock = styled(StyledLink)`
  margin-top: 69px;
`;

export const NewVoucherMessage = styled.span`
  color: ${black};
  display: block;
  font-weight: 700;
  margin-top: 69px;
`;
