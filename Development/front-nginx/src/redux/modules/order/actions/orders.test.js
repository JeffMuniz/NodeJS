import ResponseError from "src/common/entities/ResponseError";

import { getOrders, getOrder } from "./orders";
// import { GET_ORDERS_COMPLETED } from "../reducer/orderReducer";

describe("Redux Actions - Orders", () => {
  // TODO
  // it("should return GET_ORDERS_COMPLETED action with orders data from external api", async () => {
  //   // given
  //   const fakeDispatch = jest.fn();
  //   const orderApi = {
  //     getOrders: jest
  //       .fn()
  //       .mockResolvedValue({ data: { content: [{ id: "1" }], last: true } }),
  //   };
  //   const successPayload = {
  //     content: [
  //       {
  //         id: "1",
  //         date: "",
  //         amount: "",
  //         status: undefined,
  //         paymentStatus: undefined,
  //         canCancel: false,
  //         showErrorMessage: false,
  //       },
  //     ],
  //     totalItems: 0,
  //   };
  //   // when
  //   await getOrders(123, 123, "", "", "", "", 1, { orderApi })(fakeDispatch);

  //   // then
  //   expect(fakeDispatch).toBeCalledWith({
  //     type: GET_ORDERS_COMPLETED,
  //     payload: successPayload,
  //   });
  // });

  it("should throw ResponseError login when it gets error from external api", async () => {
    // given
    const fakeDispatch = action => action;
    const expectedError = new ResponseError().getError();

    let error = null;
    const orderApi = {
      getOrders: jest
        .fn()
        .mockImplementation(() => Promise.reject(expectedError)),
    };
    // when
    try {
      await getOrders("1234", { orderApi })(fakeDispatch);
    } catch (e) {
      error = e;
    }

    // then
    expect(error).toEqual(expectedError);
  });

  it("should throw ResponseError when call getOrder failed", async () => {
    // given
    const fakeDispatch = action => action;
    const expectedError = new ResponseError().getError();
    let error = null;
    const orderApi = {
      getOrder: jest
        .fn()
        .mockImplementation(() => Promise.reject(expectedError)),
    };
    // when
    try {
      await getOrder("1", { orderApi })(fakeDispatch);
    } catch (e) {
      error = e;
    }
    // then
    expect(error).toEqual(expectedError);
  });
});
