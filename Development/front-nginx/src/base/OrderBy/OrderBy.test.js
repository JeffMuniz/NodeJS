import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";
import OrderBy from "./OrderBy";

describe("OrderBy", () => {
  it("Should render it", () => {
    // given
    const renderer = new ShallowRenderer();
    const props = {
      options: [
        {
          label: "",
          shape: "",
          value: "",
        },
      ],
      onChange: jest.fn(),
      selectedOption: "",
    };

    // when
    renderer.render(<OrderBy {...props} />);
    const result = renderer.getRenderOutput();

    // then
    expect(result).toMatchSnapshot();
  });
});
