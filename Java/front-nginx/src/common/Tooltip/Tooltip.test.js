import React from "react";
import TestRenderer from "react-test-renderer";

import Tooltip from "./Tooltip";

let testRenderer;
const props = {
  message:
    "Os seus créditos serão usados automaticamente nos próximos pedidos.",
};

describe("Tooltip render", () => {
  it("Should Snapshot ", () => {
    testRenderer = TestRenderer.create(<Tooltip {...props} />);

    const tree = testRenderer.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
