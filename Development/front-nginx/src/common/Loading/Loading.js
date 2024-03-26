import React from "react";

import { Spinner, Circle, CircleGradient, CircleInner } from "./Loading.styles";

const Loading = () => (
  <Spinner>
    <Circle>
      <CircleGradient />
      <CircleInner />
    </Circle>
  </Spinner>
);

export default Loading;
