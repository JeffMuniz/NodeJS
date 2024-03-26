import React from "react";
import "./__mocks__";

jest.mock("react-text-mask", () => props => <input type="text" {...props} />);

jest.mock("lottie-web", () => ({
  loadAnimation: jest.fn(),
}));

jest.mock("crypto", () => ({
  randomBytes: num => new Array(num).fill(0),
}));
