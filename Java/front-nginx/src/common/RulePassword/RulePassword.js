import React from "react";
import { Icon } from "@common";
import { string } from "prop-types";

import { LabelSucess, LabelError } from "./RulePassword.styles";

const RulePassword = ({ text, value, error, rule, id }) => {
  const result = RegExp(rule).test(value);

  return result ? (
    <LabelSucess id={id}>
      {text} <Icon name="check-input" />
    </LabelSucess>
  ) : (
    <LabelError error={error} id={id}>
      {text} {error ? <Icon name="nocheck-input" /> : ""}
    </LabelError>
  );
};
export default RulePassword;

RulePassword.propTypes = {
  text: string.isRequired,
  value: string.isRequired,
  error: string.isRequired,
  rule: string.isRequired,
  id: string,
};

RulePassword.defaultProps = {
  id: "",
};
