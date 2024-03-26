import React from "react";
import { func, shape, arrayOf, string, number } from "prop-types";

import { ClickabeIcon } from "@base";

import { ItemWrapper, ItemText, ListWrapper } from "./PermissionsList.styles";

const handleRemoveSuggestionById = (handleRemoveSuggestion, id) => () => {
  handleRemoveSuggestion(id);
};

export const PermissionsList = ({
  selectedSuggestions,
  handleRemoveSuggestion,
}) => (
  <ListWrapper id="permissions_list">
    {selectedSuggestions.map(({ id, name: label }, index) => (
      <ItemWrapper key={id} id={`permissions_item_${index}`}>
        <ItemText>{label}</ItemText>
        <ClickabeIcon
          src="delete"
          alt="apagar"
          height={24}
          width={24}
          handleClick={handleRemoveSuggestionById(handleRemoveSuggestion, id)}
        />
      </ItemWrapper>
    ))}
  </ListWrapper>
);

PermissionsList.propTypes = {
  selectedSuggestions: arrayOf(
    shape({
      label: string,
      id: number,
    }),
  ).isRequired,
  handleRemoveSuggestion: func.isRequired,
};

export default PermissionsList;
