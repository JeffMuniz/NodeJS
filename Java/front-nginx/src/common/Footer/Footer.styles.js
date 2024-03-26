import styled from "styled-components";
import { Col, Row } from "react-styled-flexboxgrid";
import BaseIcon from "../Icon/Icon";
import {
  grey,
  lighterBlack,
  rgbaLightGrey,
  rgbaShadowGrey,
} from "../../styles/colors";

export const Icon = styled(BaseIcon)``;

const ColBase = styled(Col)`
  color: ${grey};
`;

const PBase = styled.p`
  font-style: normal;
  letter-spacing: 0.1px;
  font-weight: normal;
`;

const DivBase = styled.div`
  margin: 10px 0 10px 35px;
`;

export const FooterCol = styled(ColBase)`
  margin-top: 152px;
`;

export const FooterRow = styled(Row)`
  height: 815px;
`;

export const AttendanceCol = styled(ColBase)`
  display: flex;
  align-items: flex-end;
  ${Icon} {
    margin-right 10px;
  }
`;

export const AttendanceText = styled(PBase)`
  font-weight: bold;
  line-height: 26px;
  font-size: 16px;
  color: ${lighterBlack};
`;

export const Text = styled(PBase)`
  margin: 0;
  line-height: 16px;
  font-size: 14px;
`;

export const TextHeader = styled(PBase)`
  margin: 0;
  line-height: 16px;
  font-size: 15px;
`;

export const Sac = styled(DivBase)`
  width: 230px;
`;

export const Ombudsman = styled(DivBase)`
  width: 290px;
`;

export const Attendance = styled(DivBase)`
  width: 285px;
  position: relative;
  ${Icon} {
    position: absolute;
    right: 292px;
    top: 0;
  }
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
  display: flex;
  align-items: flex-end;
  ${Icon} {
    margin-left: 5px;
  }
`;
