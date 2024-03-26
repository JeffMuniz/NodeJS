import { toString } from "@utils";

const Statement = data => ({
  id: toString(data.id),
  idStore: toString(data.idEstabelecimento),
  storeName: data.nomeEstabelecimento,
  storeCompanyName: data.nomeFantasiaEstabelecimento,
  transactionDate: data.dataTransacao,
  transactionValue: toString(data.valorBRL),
  transactionType: data.tipoTransacao,
  transactionStatus: data.tipoStatus,
});

export default class StatementDto {
  constructor(data = {}) {
    this.id = data.id;
    this.idCompany = data.idCompany;
    this.cpf = data.cpf;
    this.idAccount = data.idAccount;
    this.name = data.name;
    this.status = data.status;
    this.currentPage = data.currentPage;
    this.numberOfElements = data.numberOfElements;
    this.content = data.content;
  }

  static fromApi(data = { content: [] }) {
    if (!data) return null;

    const itens = data.content.filter(
      item =>
        item.nomeFantasiaEstabelecimento === "macefício creditado" ||
        item.nomeFantasiaEstabelecimento === "Estorno solicitado pela empresa",
    );

    const object = {
      isFirstPage: data.first || true,
      isLastPage: data.last || true,
      totalItems: data.totalElements || 0,
      totalPages: data.totalPages || 0,
      numberOfElements: data.numberOfElements || 0,
      currentPage: data.number || 0,
      content: itens.map(stat => Statement(stat)),
    };

    return { ...object };
  }
}
