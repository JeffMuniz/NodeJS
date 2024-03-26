import DateManager from "moment";
import isArray from "lodash/isArray";
import { toMoneyMask, toCNPJMask } from "@utils";
import { dateHourFormats } from "@enums";

const formatDate = field => {
  if (field) {
    return DateManager(field)
      .startOf("day")
      .format(dateHourFormats.longDateSlash);
  }
  return "-";
};

const parseContent = data => {
  if (!isArray(data)) return [];

  return data.map(item => ({
    receivableId: item.idRecebivel || "",
    orderId: item.idPedido,
    cnpj: item.cnpjPagador ? toCNPJMask(item.cnpjPagador) : "-",
    amount: item.valorTotal ? toMoneyMask(item.valorTotal) : toMoneyMask(0),
    dueDate: formatDate(item.dataVencimento),
    paymentType: item.formaPagamento,
    receivableStatus: item.statusRecebivel || "Processando",
    invoiceDate: formatDate(item.disponibilizacaoNotaFiscal) || "",
    invoiceStatus: item.statusNotaFiscal,
    allowRpsDownload: item.emissaoDocumentoZerado,
    openOptions: false,
    showDocuments: !!item.exibeDocumentos,
    costCenter: item.centroCusto || "N/D",
  }));
};

export const fromApi = (data = {}) => {
  const { recebiveis, meta } = data;

  return {
    totalItems: meta.total || 0,
    content: parseContent(recebiveis),
  };
};
