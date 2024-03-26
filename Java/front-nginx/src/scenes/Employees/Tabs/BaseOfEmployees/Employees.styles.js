import styled from "styled-components";
import ValueLabelText from "src/common/ValueLabelText/ValueLabelText";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const ValueLabelRow = styled.div`
  display: flex;
  min-height: 30px;
  margin-bottom: 30px;
  justify-content: space-between;
  align-items: flex-end;
`;

export const ValueLabelDiv = styled.div`
  display: flex;
`;

export const ValueLabelTextStyled = styled(ValueLabelText)`
  margin-right: 99px;
  margin-bottom: 0px;
`;

export const CardTabs = styled.div`
  padding: 0;
  margin: 0;
`;
