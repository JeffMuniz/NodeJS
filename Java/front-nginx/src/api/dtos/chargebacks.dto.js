import DateManager from "src/modules/DateManager/DateManager";
import { dateHourFormats } from "@enums";
import { toMoneyMask } from "@utils";

export default class ChargebacksDto {
  constructor(data = {}) {
    this.id = data.id;
    this.requester = data.requester;
    this.reason = data.reason;
    this.status = data.status;
    this.requestDate = data.requestDate;
    this.requestValue = data.requestValue;
    this.chargebackValue = data.chargebackValue;
    this.qty = data.qty;
    this.terms = data.terms;
  }

  static fromApi(data) {
    if (!data) return null;

    const object = {
      id: data.id || "--",
      requester: data.solicitante || "--",
      reason: data.motivo || "--",
      status: data.status || "--",
      requestDate:
        DateManager.utc(data.data_solicitacao).format(
          dateHourFormats.longDateHour,
        ) || "--",
      requestValue: toMoneyMask(data.valor_solicitado) || "--",
      chargebackValue: toMoneyMask(data.valor_estornado) || "--",
      qty: data.quantidade || "--",
      terms: data.termo_aceite || "--",
    };

    return { ...object };
  }
}
