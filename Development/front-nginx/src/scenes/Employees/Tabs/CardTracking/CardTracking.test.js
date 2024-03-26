import React from "react";
import TestRenderer from "react-test-renderer";

import CardTracking from "./CardTracking";
import CardTrackingNotFound from "./CardTrackingNotFound/CardTrackingNotFound";
import CardTrackingList from "./CardTrackingList/CardTrackingList";

jest.mock("@base", () => ({
  AutoSuggestInput: "AutoSuggestInput",
}));

jest.mock("./CardTrackingList/CardTrackingList", () => "CardTrackingList");
jest.mock(
  "./CardTrackingNotFound/CardTrackingNotFound",
  () => "CardTrackingNotFound",
);

let testRenderer = null;

describe("CardTracking", () => {
  beforeEach(() => {
    testRenderer = TestRenderer.create(<CardTracking />);
  });

  it("should render CardTrackingNotFound when selected employee has no cards", () => {
    // given
    const newProps = {
      cardsNotFound: true,
    };
    testRenderer.update(<CardTracking {...newProps} />);

    // then
    expect(testRenderer.root.findAllByType(CardTrackingNotFound)).toHaveLength(
      1,
    );
  });

  it("should not render CardTrackingNotFound when selected employee has cards", () => {
    // given
    const newProps = {
      cardsNotFound: false,
    };
    testRenderer.update(<CardTracking {...newProps} />);

    // then
    expect(testRenderer.root.findAllByType(CardTrackingNotFound)).toHaveLength(
      0,
    );
  });

  it("should render CardTrackingList when selected employee has cards", () => {
    // given
    const newProps = {
      vouchers: [
        {
          id: "1",
          printedName: "BERTA RAYNOR",
          idProduct: "1",
          cardNumber: "1111********2222",
          issueDate: "2018-10-02T17:16:34.893Z",
        },
      ],
    };
    testRenderer.update(<CardTracking {...newProps} />);

    // then
    expect(testRenderer.root.findAllByType(CardTrackingList)).toHaveLength(1);
  });
});
