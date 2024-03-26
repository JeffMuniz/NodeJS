import React from "react";
import { arrayOf, func, string, shape } from "prop-types";
import { Option, Container, Span } from "./OrderBy.styles";

const OrderByComponent = ({ options, onChange, selectedOption, title }) => (
  <Container>
    <Span>{title}: </Span>
    {options.map(option => (
      <Option
        id={option.label}
        key={option.label}
        selected={selectedOption === option.value}
        onClick={onChange}
      >
        <span>{option.label}</span>
      </Option>
    ))}
  </Container>
);

OrderByComponent.propTypes = {
  options: arrayOf(
    shape({
      label: string,
      value: string,
    }),
  ).isRequired,
  onChange: func.isRequired,
  selectedOption: string.isRequired,
  title: string,
};

OrderByComponent.defaultProps = {
  title: "",
};

export default OrderByComponent;
