import React from "react";
import { func, arrayOf, shape, number, string, bool } from "prop-types";
import Autosuggest from "react-autosuggest";

import { SvgIcon } from "@common";
import { If } from "@utils";
import { red } from "@colors";
import {
  InputWrapper,
  ErrorMessage,
  IconWrapper,
} from "./AutoSuggestInput.styles";

export const AutoSuggestInput = ({
  suggestions,
  onSuggestionsFetchRequested,
  onSuggestionsClearRequested,
  getSuggestionValue,
  renderSuggestion,
  onSuggestionSelected,
  inputProps,
  maxLength,
  xs,
  md,
  error,
  disabled,
}) => (
  <InputWrapper xs={xs} md={md} error={error} disabled={disabled}>
    <Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      onSuggestionSelected={onSuggestionSelected}
      maxLength={maxLength}
      inputProps={{ ...inputProps, disabled }}
    />
    <If test={error}>
      <IconWrapper>
        <SvgIcon name="close" fill={red} />
      </IconWrapper>
      <ErrorMessage id="auto_suggest_input_error_message">{error}</ErrorMessage>
    </If>
  </InputWrapper>
);

AutoSuggestInput.propTypes = {
  suggestions: arrayOf(shape({})).isRequired,
  onSuggestionsFetchRequested: func,
  onSuggestionsClearRequested: func,
  getSuggestionValue: func,
  renderSuggestion: func,
  onSuggestionSelected: func,
  inputProps: shape({
    value: string,
    onChange: func,
  }).isRequired,
  maxLength: number,
  xs: number,
  md: number,
  error: string,
  disabled: bool,
};

AutoSuggestInput.defaultProps = {
  onSuggestionsFetchRequested: () => {},
  onSuggestionsClearRequested: () => {},
  getSuggestionValue: () => {},
  renderSuggestion: () => {},
  onSuggestionSelected: () => {},
  maxLength: 14,
  xs: 1,
  md: 1,
  error: "",
  disabled: false,
};

export default AutoSuggestInput;
