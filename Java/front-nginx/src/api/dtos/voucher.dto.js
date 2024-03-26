import { toString } from "@utils";

export default class VoucherDto {
  constructor(data = {}) {
    this.id = data.id;
    this.cardNumber = data.cardNumber;
    this.companyName = data.companyName;
    this.cnpj = data.cnpj;
    this.idAccount = data.idAccount;
    this.printedName = data.printedName;
    this.idOwner = data.idOwner;
    this.idProduct = data.idProduct;
    this.idStatus = data.idStatus;
    this.statusName = data.statusName;
    this.balance = data.balance;
    this.issueDate = data.issueDate;
    this.generationDate = data.generationDate;
    this.statusDate = data.statusDate;
    this.validateDate = data.validateDate;
  }

  static fromApi(data = {}) {
    const object = {
      id: toString(data.id),
      cardNumber: toString(data.numeroCartao),
      companyName: data.nomeEmpresa,
      cnpj: data.cnpj,
      idAccount: toString(data.idConta),
      printedName: data.nomeImpresso,
      idOwner: toString(data.idPessoa),
      idProduct: toString(data.idProduto),
      idStatus: toString(data.idStatus),
      statusName: data.nomeStatus || "",
      balance: toString(data.saldo),
      issueDate: data.dataEmissao,
      generationDate: data.dataGeracao,
      statusDate: data.dataStatus,
      validateDate: data.dataValidade,
    };

    return { ...object };
  }
}
