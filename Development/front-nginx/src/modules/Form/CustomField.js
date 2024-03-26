import React, { Fragment } from "react";
import { string, bool, shape, oneOfType, number } from "prop-types";
import { isNil, kebabCase, has, get } from "lodash";
import MaskedInput from "react-text-mask";
import { red } from "@colors";
import { SvgIcon } from "@common";

import { If } from "@utils";

import { Field } from "./index";

import { FieldWrapper, Label, ErrorMessage } from "./CustomField.styled";

const CustomField = ({
  name,
  label,
  id,
  component,
  touched,
  errors,
  mask,
  placeholder,
  width,
  iconErro,
  ...rest
}) => {
  let identifier = id;
  const hasError = has(errors, name);
  const erroReview = has(errors, "va") || has(errors, "vr");

  if (isNil(identifier)) {
    identifier = `input-${kebabCase(name)}`;
  }

  const commonProps = {
    ...rest,
    name,
    hasError,
    id: identifier,
  };

  return (
    <FieldWrapper width={width} hasError={hasError || erroReview}>
      <If test={label}>
        <Label>{label}</Label>
      </If>

      {mask ? (
        <Field {...commonProps}>
          {({ field }) => (
            <MaskedInput
              mask={mask}
              {...field}
              {...rest}
              id={identifier}
              placeholder={placeholder}
            />
          )}
        </Field>
      ) : (
        <Fragment>
          <Field
            {...commonProps}
            component={component}
            placeholder={placeholder}
          />
          <If test={(erroReview && !rest.disabled) || (hasError && iconErro)}>
            <SvgIcon name="close" fill={red} />
          </If>
        </Fragment>
      )}

      <If test={hasError && !iconErro}>
        <ErrorMessage id={`input-erro-${name}`} className="error">
          {get(errors, name, "")}
        </ErrorMessage>
      </If>
    </FieldWrapper>
  );
};

export const CustomFieldPropsTypes = {
  name: string.isRequired,
  label: string,
  component: string,
  id: oneOfType([string, number]),
  width: string,
  touched: bool,
  errors: shape({}),
  mask: string,
  placeholder: string,
  iconErro: bool,
};

CustomField.propTypes = CustomFieldPropsTypes;

CustomField.defaultProps = {
  touched: {},
  errors: {},
  label: null,
  id: null,
  mask: null,
  placeholder: null,
  width: null,
  component: "input",
  iconErro: false,
};

export default CustomField;
