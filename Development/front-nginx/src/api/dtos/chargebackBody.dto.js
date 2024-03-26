import { toMoneyMask } from "@utils";

const getChargebacks = (data = [{}]) => {
  let VA = false;
  let VR = false;
  let returnedValues = [];
  data.map(item => {
    if (item.produto === "VA") VA = true;
    if (item.produto === "VR") VR = true;
    returnedValues.push({
      product: item.produto || "--",
      requestValue: toMoneyMask(item.valor_solicitado) || "--",
      chargebackValue: toMoneyMask(item.valor_estornado) || "--",
    });
    if (VR && data.length === 1) {
      returnedValues = [
        ...returnedValues,
        {
          product: "VA",
          requestValue: "--",
          chargebackValue: "--",
        },
      ];
    }
    if (VA && data.length === 1) {
      returnedValues = [
        {
          product: "VR",
          requestValue: "--",
          chargebackValue: "--",
        },
        ...returnedValues,
      ];
    }
    return returnedValues;
  });
  return returnedValues;
};

const RequestSplitDTO = (data = {}) => ({
  employee: data.funcionario || "--",
  cpf: data.cpf || "--",
  chargebacks: getChargebacks(data.estornos) || [],
  employeeId: data.id_funcionario || "--",
});

export default class ChargebacksBodyDto {
  constructor(data = {}) {
    this.employee = data.employee;
    this.cpf = data.cpf;
    this.chargebacks = data.chargebacks;
    this.employeeId = data.employeeId;
  }

  static fromApi(data) {
    if (!data) return null;

    const object = {
      currentPage: data.number,
      totalItems: data.totalElements,
      totalPages: data.totalPages,
      content: data.content.map(el => RequestSplitDTO(el)),
    };
    return { ...object };
  }
}
