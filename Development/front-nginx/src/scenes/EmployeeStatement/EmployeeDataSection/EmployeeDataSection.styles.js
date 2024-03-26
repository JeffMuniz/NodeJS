import styled from "styled-components";
import { Row, Col } from "react-styled-flexboxgrid";

import { lighterBlack, darkGrey, red } from "src/styles/colors";

export const Container = styled.div`
  border-bottom: 2px dotted ${darkGrey};
  margin-bottom: 32px;
  padding-bottom: 28px;
`;

export const ActionsRow = styled(Row)`
  margin: 0;
  padding: 0 10px;
`;

export const InfosRow = styled(Row)`
  margin: 0;
  padding: 0 26px;
`;

export const EmployeeCol = styled(Col)`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const RegistryInfo = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 5px;
  flex: 1.2;
`;

export const StyledName = styled.span`
  font-family: Barlow, sans-serif;
  font-weight: 600;
  line-height: 40px;
  font-size: 32px;
  letter-spacing: 0.3px;
  display: block;
  color: ${lighterBlack};
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 450px;
`;

export const StyledStatus = styled.span`
  line-height: 26px;
  font-size: 16px;
  color: ${({ inactive }) => (inactive ? red : lighterBlack)};
  letter-spacing: 0.1px;
  width: 340px;
`;

export const InfoCol = styled(Col)`
  display: inline-block;
  margin: 5px;
  &:first-child {
    margin-left: 0;
  }
`;

export const InfoTitle = styled.span`
  line-height: 22px;
  font-size: 12px;
  display: block;
  color: ${lighterBlack};
`;

export const InfoContent = styled.span`
  font-weight: 600;
  line-height: 24px;
  font-size: 14px;
  display: inline-block;
  color: ${lighterBlack};
`;
