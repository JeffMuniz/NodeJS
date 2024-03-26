import React from "react";
import { elementType } from "prop-types";
import { If } from "@utils";

import {
  Container,
  WrapperLeft,
  WrapperRight,
  Separator,
} from "./RowOrder.styles";

const RowOrder = ({ children }) => (
  <Container>
    <If test={children}>
      <WrapperLeft id="wrapper-left">{children[0] || children}</WrapperLeft>
      <If test={children[1]}>
        <Separator />
      </If>
      <WrapperRight id="wrapper-rigth">{children[1]}</WrapperRight>
    </If>
  </Container>
);

RowOrder.propTypes = {
  children: elementType,
};

RowOrder.defaultProps = {
  children: "",
};
export default RowOrder;
