import React, { Fragment } from "react";
import { bool, arrayOf, shape, func, string } from "prop-types";

import { CheckBox } from "@common";
import { AutoSuggestInput, WithPagination, Separator, Loading } from "@base";
import { If } from "@utils";

import PermissionsList from "../PermissionsList/PermissionsList";

import {
  EmptyStateText,
  ButtonWrapper,
  StyledButton as Button,
  SubgroupInputLabel,
  LoadingWrapper,
} from "./CreateAccessForm.styles";

export const renderSuggestions = suggestion => <div>{suggestion.name}</div>;

export const EmptyStateComponent = disabled => () => (
  <Fragment>
    <Separator disabled={disabled} />
    <EmptyStateText disabled={disabled}>
      Nenhum subgrupo atribuído
    </EmptyStateText>
    <Separator disabled={disabled} />
  </Fragment>
);

export const renderPermissionsList = (
  selectedSuggestions,
  handleOpenModal,
) => () => (
  <PermissionsList
    selectedSuggestions={selectedSuggestions}
    handleRemoveSuggestion={handleOpenModal}
  />
);

export const CreateAccessForm = ({
  giveAccessLevelToWholeGroup,
  filteredSuggestions,
  getSuggestions,
  handleCheckBoxClick,
  getSuggestionValue,
  handleSuggestionFetchRequested,
  inputValue,
  handleChange,
  handleSuggestionClearRequested,
  selectedSuggestions,
  handleSuggestionSelected,
  shouldButtonBeDisabled,
  handleOpenModal,
  onSubmit,
  handleGoBack,
  errorMessage,
  allowGroupPermission,
  loading,
}) => (
  <Fragment>
    <If test={loading}>
      <LoadingWrapper>
        <Loading loading />
      </LoadingWrapper>
    </If>
    <If test={!loading}>
      <If test={allowGroupPermission}>
        <Fragment>
          <CheckBox
            label="Conceder acesso a todo o grupo"
            checked={giveAccessLevelToWholeGroup}
            onChange={handleCheckBoxClick}
            name="access_form_checkbox"
            id="access_form_checkbox"
            strongFont
          />
          <SubgroupInputLabel>atribuir subgrupo</SubgroupInputLabel>
        </Fragment>
      </If>
      <AutoSuggestInput
        disabled={giveAccessLevelToWholeGroup}
        suggestions={filteredSuggestions}
        getSuggestions={getSuggestions}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestions}
        onSuggestionsFetchRequested={handleSuggestionFetchRequested}
        onSuggestionsClearRequested={handleSuggestionClearRequested}
        onSuggestionSelected={handleSuggestionSelected}
        error={errorMessage}
        inputProps={{
          value: inputValue,
          onChange: handleChange,
          placeholder: "Insira o nome do subgrupo",
          id: "input_matrix",
        }}
        xs={6}
        md={6}
      />
      <WithPagination
        data={{ totalItems: selectedSuggestions.length }}
        itemsPerPage={8}
        render={renderPermissionsList(selectedSuggestions, handleOpenModal)}
        emptyStateComponent={EmptyStateComponent(giveAccessLevelToWholeGroup)}
      />
      <ButtonWrapper>
        <Button
          id="btn_cancel_access"
          value="Cancelar"
          buttonType="actionButton"
          onPress={handleGoBack}
        />
        <Button
          id="btn_submit_access"
          value="Concluir"
          onPress={onSubmit}
          disabled={shouldButtonBeDisabled}
        />
      </ButtonWrapper>
    </If>
  </Fragment>
);

CreateAccessForm.propTypes = {
  giveAccessLevelToWholeGroup: bool.isRequired,
  filteredSuggestions: arrayOf(shape({})).isRequired,
  getSuggestions: func.isRequired,
  handleCheckBoxClick: func.isRequired,
  getSuggestionValue: func.isRequired,
  handleSuggestionFetchRequested: func.isRequired,
  inputValue: string.isRequired,
  handleChange: func.isRequired,
  handleSuggestionClearRequested: func.isRequired,
  selectedSuggestions: arrayOf(shape({})).isRequired,
  handleSuggestionSelected: func.isRequired,
  shouldButtonBeDisabled: bool.isRequired,
  handleOpenModal: func.isRequired,
  onSubmit: func.isRequired,
  handleGoBack: func.isRequired,
  errorMessage: string,
  allowGroupPermission: bool.isRequired,
  loading: bool.isRequired,
};

CreateAccessForm.defaultProps = {
  errorMessage: "",
};

EmptyStateComponent.propTypes = {
  disabled: bool.isRequired,
};

export default CreateAccessForm;
