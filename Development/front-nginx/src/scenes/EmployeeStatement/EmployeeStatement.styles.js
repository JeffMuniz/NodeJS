import styled from "styled-components";
import { shark, warningYellow } from "src/styles/colors";

export const CardTabs = styled.div`
  padding: 0 8px;
  margin: 3px 0;
`;

export const SelectWrapper = styled.div`
  display: block;
  padding: 0;
  margin: 0 auto 10px 0;
`;

export const PeriodLabel = styled.p`
  display: inline-block;
  margin-right: 5px;
`;

export const DropDown = styled.div`
  width: 300px;
  display: inline-block;
`;

export const CalendarInfoWrapper = styled.div`
  margin: 30px 25px;
`;

export const CalendarInfo = styled.span`
  font-style: italic;
  font-weight: 600;
  line-height: 20px;
  font-size: 12px;
  color: ${shark};
`;

export const WarningCalendarInfo = styled(CalendarInfo)`
  color: ${warningYellow};
  margin-right: 2px;
`;

export const Description = styled.div`
  font-size: 16px;
  font-weight: 600;
  margin-left: 10px;
`;
