import React from "react";
import { number, arrayOf, shape, string } from "prop-types";

import {
  Wrapper,
  Progress,
  Bubble,
  Label,
  ItemsWrapper,
  ProgressWrapper,
} from "./Stepper.styles";

export const Stepper = ({ progress, steps }) => (
  <Wrapper>
    <ProgressWrapper>
      {steps.map((step, index) => (
        <ItemsWrapper stepsQuantity={steps.length} index={index} key={step.id}>
          <Label>{step.label}</Label>
          <Bubble
            progress={progress}
            stepsQuantity={steps.length}
            index={index}
            key={step.id}
          />
        </ItemsWrapper>
      ))}
      <Progress value={progress} max={100} />
    </ProgressWrapper>
  </Wrapper>
);

Stepper.propTypes = {
  progress: number.isRequired,
  steps: arrayOf(
    shape({
      id: string,
      label: string,
    }),
  ).isRequired,
};

export default Stepper;
