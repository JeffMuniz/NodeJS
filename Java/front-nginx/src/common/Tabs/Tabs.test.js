import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";
import TestRenderer from "react-test-renderer";
import { Provider } from "react-redux";

import { Tabs } from "./Tabs";
import { createMockStore } from "../../redux/configureMockStore";

describe("Tabs Component", () => {
  it("should render it", () => {
    // given
    const renderer = new ShallowRenderer();
    const store = {
      setSelectedTab: () => null,
    };

    // when
    renderer.render(
      <Provider store={createMockStore(store)}>
        <Tabs>
          <div label="Grupo">
            <span>Grupo Content</span>
          </div>
          <div label="Matriz">
            <span>Matriz Content</span>
          </div>
        </Tabs>
      </Provider>,
    );
    const result = renderer.getRenderOutput();

    // then
    expect(result).toMatchSnapshot();
  });

  it("should render active tab when a specific gets value", () => {
    // given
    const instance = TestRenderer.create(
      <Tabs activeTab="Matriz">
        <div label="Grupo">
          <span>Grupo Content</span>
        </div>
        <div label="Matriz">
          <span>Matriz Content</span>
        </div>
      </Tabs>,
    ).getInstance();

    // then
    expect(instance.state.activeTab).toBe("Matriz");
  });
});
