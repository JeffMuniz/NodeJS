import { toString } from "@utils";

export default class CardTrackingDto {
  constructor(voucher = {}) {
    this.id = voucher.id;
    this.cardNumber = voucher.cardNumber;
    this.printedName = voucher.printedName;
    this.idProduct = voucher.idProduct;
    this.idStatus = voucher.idStatus;
    this.statusName = voucher.statusName;
    this.issueDate = voucher.issueDate;
    this.generationDate = voucher.generationDate;
    this.statusDate = voucher.statusDate;
    this.validateDate = voucher.validateDate;
    this.trackCode = voucher.trackCode;
    this.trackStatus = voucher.trackStatus;
  }

  static fromApi(voucher = {}) {
    const object = {
      id: toString(voucher.id),
      cardNumber: toString(voucher.numeroCartao),
      printedName: voucher.nomeImpresso,
      idProduct: toString(voucher.idProduto),
      idStatus: toString(voucher.idStatus),
      statusName: voucher.nomeStatus,
      issueDate: voucher.dataEmissao,
      generationDate: voucher.dataGeracao,
      statusDate: voucher.dataStatus,
      validateDate: voucher.dataValidade,
      trackCode: voucher.codigoRastreio,
      trackStatus: voucher.trackStatus,
      address: voucher.endereco,
      nomeStatus: voucher.nomeStatus,
    };

    return { ...object };
  }
}
