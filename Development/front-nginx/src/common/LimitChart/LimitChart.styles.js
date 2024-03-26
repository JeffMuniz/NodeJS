import styled from "styled-components";
import { Row } from "react-styled-flexboxgrid";
import PieChart from "src/modules/PieChart/PieChart";
import { ifStyle } from "@utils";
import {
  black,
  red,
  lighterBlack,
  simpleDarkenGrey,
  darkGreen,
  blue,
  rgbaStrongShadowGrey,
} from "@colors";

const hasBorderTop = ifStyle("hasBorderTop");

export const Container = styled(Row)`
  border-top: ${hasBorderTop(`1px solid ${rgbaStrongShadowGrey}`, "none")};
  display: flex;
  padding: 40px 0 24px;
  margin: 0 0 32px;
`;

export const ChartWrapper = styled.div`
  width: 80px;
  height: 80px;
  position: relative;
`;

export const ChartTransform = styled.div`
  transform: scaleX(-1);
`;

export const Chart = styled(PieChart)`
  transform: rotate(135deg);
`;

export const Percentage = styled.span`
  position: absolute;
  left: 17px;
  top: 30px;
  width: 45px;
  font-weight: 700;
  text-align: center;
  letter-spacing: 0.1;
`;

export const BottomLabel = styled.span`
  position: absolute;
  font-size: 12px;
  line-height: 16px;
  text-align: center;
  letter-spacing: 0.1px;
  color: ${black};
  top: 73px;
  left: 15px;
`;

export const DescriptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto 18px;
`;
export const Title = styled.span`
  font-size: 12px;
  line-height: 26px;
  letter-spacing: 0.1px;
  color: ${red};
`;
export const AvailableValue = styled.span`
  font-weight: 600;
  font-size: 32px;
  line-height: 40px;
  letter-spacing: 0.3px;
  color: ${lighterBlack};
`;
export const Description = styled.span`
  font-weight: bold;
  font-size: 12px;
  line-height: 18px;
  letter-spacing: 0.1px;
  color: ${simpleDarkenGrey};
`;

export const UsedLimit = styled(Description)`
  color: ${darkGreen};
`;

export const TotalLimit = styled(Description)`
  color: ${black};
`;

export const MailTo = styled.a`
  color: ${blue};
  font-weight: normal;
  text-decoration: none;
`;
