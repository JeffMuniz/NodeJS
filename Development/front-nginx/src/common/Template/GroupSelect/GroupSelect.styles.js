import styled from "styled-components";
import Icon from "src/common/Icon/Icon";
import {
  lightBlack,
  borderGrey,
  blue,
  darkWhite,
  darkYellow,
  grey,
  shark,
} from "@colors";
import { ifStyle } from "@utils";

const isSelected = ifStyle("selected");

export const Wrapper = styled.div`
  min-height: 200px;
  padding: 24px 24px;
  text-align: center;
  width: 356px;
`;

export const WrapperEmpty = styled(Wrapper)`
  width: 262px;
`;

export const Title = styled.div`
  color: ${lightBlack};
  font-size: 30px;
  font-weight: 600;
  letter-spacing: 0.3px;
  line-height: 40px;
  text-align: center;
`;

export const EmptyTitle = styled(Title)`
  color: ${darkYellow};
  margin-bottom: 12px;
`;

export const Separator = styled.div`
  background-color: ${darkWhite};
  height: 2px;
  margin: 15px auto 19px auto;
  width: 80px;
`;

export const GroupList = styled.div`
  max-height: 270px;
  overflow: auto;
`;

export const GroupItem = styled.div`
  background-color: ${borderGrey};
  color: ${isSelected(shark, blue)};
  cursor: ${isSelected("not-allowed", "pointer")};
  display: flex;
  font-size: 16px;
  font-weight: 600;
  justify-content: space-between;
  line-height: 26px;
  margin: 1px 0 1px 0;
  padding: 24px;
  user-select: none;
  align-items: center;
`;

export const Text = styled(Title)`
  color: ${grey};
  font-weight: normal;
  line-height: 26px;
  font-size: 16px;
  text-align: center;
`;

export const RemoveIcon = styled(Icon)`
  margin: 0 auto;
  & > path {
    fill: ${darkYellow};
  }
`;
