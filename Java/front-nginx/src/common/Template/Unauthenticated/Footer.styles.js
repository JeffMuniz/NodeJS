import styled from "styled-components";
import { LoginFooter } from "@assets";
import { grey, darkGrey } from "@colors";
import SocialMedia from "./SocialMedia";

export const FooterH1 = styled.div`
  font-weight: 600;
  font-size: 16px;
  line-height: 23px;
  text-transform: uppercase;
`;

export const FooterText = styled.div`
  font-size: 12px;
  line-height: 16px;
  color: ${grey};
`;

export const FooterContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  border-top: 1px solid ${darkGrey};
  padding-top: 16px;
`;

export const FooterInfo = styled.div`
  width: 352px;
`;

export const FooterSocialMedia = styled(SocialMedia)`
  width: 96px;
`;

export const FooterImage = styled.div`
  width: 100%;
  margin-top: 16px;
  height: 32px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  background: url(${LoginFooter}) no-repeat;
`;
