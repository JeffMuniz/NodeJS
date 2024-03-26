import React from "react";
import TestRenderer from "react-test-renderer";

import { ChargeBackDetailsContainer } from "./ChargeBackDetails.container";

jest.mock("./ChargeBackDetails", () => "ChargeBackDetails");
jest.mock("@base", () => ({
  SearchableInput: "SearchableInput",
}));

let instance;
let testRenderer;
let props;

describe("ChargeBack Details Container", () => {
  beforeEach(() => {
    props = {
      openModal: jest.fn(),
      detailsHeader: {},
      detailsBody: [],
      history: {
        push: jest.fn(),
      },
      goBackDetails: jest.fn(),
    };

    testRenderer = TestRenderer.create(
      <ChargeBackDetailsContainer {...props} />,
    );
    instance = testRenderer.getInstance();

    jest.clearAllMocks();
  });

  it("Should  get value to status", () => {
    expect(instance.getColor({ status: "Processando" })).toBe("#FF9C00");
  });

  it("Should invoke openModal", () => {
    instance.handleTerm();

    expect(instance.props.openModal).toHaveBeenCalled();
  });

  it("should call navigate when return route is called", async () => {
    // given
    instance.route();
    // then
    expect(instance.props.goBackDetails).toHaveBeenCalled();
  });
});
