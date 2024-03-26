import React from "react";
import { arrayOf, func, shape, number } from "prop-types";

import Icon from "src/common/Icon/Icon";
import {
  Wrapper,
  Title,
  Separator,
  GroupList,
  GroupItem,
} from "./GroupSelect.styles";

const GroupSelect = ({ groupList, onSelectGroup, selectedGroupId }) => (
  <Wrapper>
    <Title>Escolha o grupo que deseja acessar:</Title>
    <Separator />
    <GroupList>
      {groupList.map((item, index) => {
        const selected = item.id === selectedGroupId;
        return (
          <GroupItem
            key={item.id}
            id={`group-${index}`}
            onClick={!selected ? onSelectGroup(item) : undefined}
            selected={selected}
          >
            {item.name}
            {selected ? (
              <Icon name="check-blue" />
            ) : (
              <Icon name="arrow-right" />
            )}
          </GroupItem>
        );
      })}
    </GroupList>
  </Wrapper>
);

export default GroupSelect;

GroupSelect.propTypes = {
  groupList: arrayOf(shape({})),
  onSelectGroup: func,
  selectedGroupId: number,
};

GroupSelect.defaultProps = {
  groupList: [],
  onSelectGroup: () => null,
  selectedGroupId: undefined,
};
