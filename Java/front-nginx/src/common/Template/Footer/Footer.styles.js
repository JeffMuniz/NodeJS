import styled from "styled-components";
import { Col, Row } from "react-styled-flexboxgrid";
import BaseIcon from "src/common/Icon/Icon";
import {
  grey,
  lighterBlack,
  rgbaLightGrey,
  rgbaShadowGrey,
  dustyGray,
} from "src/styles/colors";

export const Icon = styled(BaseIcon)`
  & > path {
    fill: ${dustyGray};
  }
`;

const ColBase = styled(Col)`
  color: ${grey};
`;

const PBase = styled.p`
  font-style: normal;
  letter-spacing: 0.1px;
  font-weight: normal;
`;

export const AttendanceCol = styled(ColBase)`
  margin-bottom: 15px;
`;

export const IconCol = styled(ColBase)`
  margin-bottom: 15px;
  text-align: center;
`;

export const FooterCol = styled(ColBase)`
  margin-top: 152px;
`;

export const FooterRow = styled(Row)`
  height: 815px;
`;

export const AttendanceText = styled.span`
  font-weight: bold;
  line-height: 26px;
  font-size: 16px;
  color: ${lighterBlack};
`;

export const Text = styled(PBase)`
  margin: 0;
  line-height: 16px;
  font-size: 12px;
`;

export const PhoneText = styled(PBase)`
  margin: 7px 0 0 0;
  line-height: 18px;
  font-size: 14px;

  small {
    font-size: 12px;
    letter-spacing: 0.1px;
  }
`;

export const TextItalic = styled(PBase)`
  margin: 7px 0 20px 0;
  letter-spacing: 0.1px;
  font-size: 13px;
  font-style: italic;
  color: ${dustyGray};
`;

export const SmallGrayText = styled.small`
  margin: 7px 0 20px 0;
  letter-spacing: 0.1px;
  font-size: 14px;
  color: ${dustyGray};
`;

export const Line = styled.div`
  background: ${rgbaShadowGrey};
  height: 3px;
  box-shadow: inset 0px 1px 0px ${rgbaLightGrey};
`;

export const Copyright = styled.div`
  margin-top: 30px;
  text-align: center;
  color: ${grey};
  ${Text} {
    line-height: 22px;
  }
`;

export const SantanderDiv = styled(ColBase)`
  align-items: flex-end;
  display: flex;
  font-size: 15px;
  margin-top: 26px;
  & > img {
    margin-left: 5px;
  }
`;
