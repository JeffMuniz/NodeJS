import React from "react";

import TestRenderer from "react-test-renderer";

import { ChargeBackTOSContainer } from "./ChargeBackTOS.container";

let testRenderer;
let testInstance;
let formInstance;

const props = {
  chargeBackTerms: {
    acceptDate: "07/05/2020",
    address: {
      neighborhood: "Herzog Isle",
      zipcode: "49.112-714",
      city: "Selmerbury",
      complement: "awoaNo",
      street: "siS",
    },
    city: "São Paulo",
    cnpj: "07324288832331",
    company: "Weber",
    day: "07",
    id: "5eb40f0719748f00017241f9",
    month: "05",
    mountedAddress: "siS, 8207 - Herzog Isle - Selmerbury/SP",
    reason: "FRAUDE",
    requestStatus: "success",
    type: "estorno",
    year: "2020",
  },
  closeModal: jest.fn(),
  showToast: jest.fn(),
  isView: true,
  employees: {},
  company: {},
  companyChargeBack: jest.fn(),
  statusChargeBack: {
    requestStatus: "success",
    payload: {
      id: 34,
    },
  },
  chargeBackTermsRequest: jest.fn(),
  chargeBackTermsView: jest.fn(),
};

describe("ChargeBackTOS", () => {
  beforeEach(() => {
    testRenderer = TestRenderer.create(<ChargeBackTOSContainer {...props} />);
    testInstance = testRenderer.root;
    formInstance = testInstance.findByType(ChargeBackTOSContainer).instance;
  });

  it("should button disabled ", async () => {
    await formInstance.onClickButtonOkHandler();

    expect(formInstance.state.buttonEnabled).toBeFalsy();

    await formInstance.handleSubmit();
  });

  it("should button enabled", () => {
    formInstance.onContentBottomReachHandler();

    expect(formInstance.state.buttonEnabled).toBeTruthy();
  });

  it("should render statuChargeBack empty", async () => {
    props.statusChargeBack = {};
    testRenderer.update(<ChargeBackTOSContainer {...props} />);

    formInstance.handleSubmit();

    expect(formInstance.props.statusChargeBack).toEqual({});
  });

  it("should render TOS preview", () => {
    props.isView = false;
    testRenderer.update(<ChargeBackTOSContainer {...props} />);

    formInstance.state.buttonEnabled = true;

    expect(formInstance.state.buttonEnabled).toBeTruthy();

    expect(
      testInstance.findByProps({ id: "btn_accept_tos" }).props.value,
    ).toEqual("LI E ACEITO O TERMO");
  });
});
