import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";
import CardTrackingList from "./CardTrackingList";

describe("CardTrackingList", () => {
  it("Should render CardTrackingList", () => {
    // given
    const renderer = new ShallowRenderer();
    const vouchers = [
      {
        id: "1",
        printedName: "TESTE",
        idProduct: "1",
        cardNumber: "1111xxxxxxxx2222",
        issueDate: "2018-09-19T14:38:56.707Z",
      },
    ];

    // when
    renderer.render(<CardTrackingList vouchers={vouchers} />);
    const result = renderer.getRenderOutput();

    // then
    expect(result).toMatchSnapshot();
  });
});
