import DateManager from "moment";
import isArray from "lodash/isArray";
import { toMoneyMask, toCNPJMask } from "@utils";
import { dateHourFormats } from "@enums";

const getInvoiceType = invoice => {
  if (invoice.links && !invoice.links.length) return "";

  return invoice.links[0].rel.toUpperCase();
};

const getInvoicePayer = invoice => {
  if (invoice.pagador)
    return {
      name: invoice.pagador.nome,
      cnpj: toCNPJMask(invoice.pagador.cnpj),
    };
  return { name: "-", cnpj: "-" };
};

const formatDate = field => {
  if (field) {
    return DateManager(field)
      .startOf("day")
      .format(dateHourFormats.longDateSlash);
  }
  return "-";
};

const getReceivable = invoice => {
  if (invoice.recebivel) {
    return {
      id: invoice.recebivel.id,
      dueDate: formatDate(invoice.recebivel.dataVencimento),
      type: invoice.recebivel.tipo,
      status: invoice.recebivel.status,
      amount: toMoneyMask(invoice.recebivel.valor),
    };
  }
  return {
    dueDate: "-",
    type: "-",
    status: "Processando",
    amount: 0,
  };
};

const getLinks = link => {
  if (!isArray(link)) return [];
  return {
    nf: link[0].href,
    bill: link.length > 1 ? link[1].href : "",
  };
};

const getDocument = doc => ({
  type: doc.tipo,
  number: doc.numero,
  numberNf: doc.numeroNf,
});

const parseContent = data => {
  if (!isArray(data.content)) return [];

  return data.content.map(invoice => ({
    value: invoice.valorNota ? toMoneyMask(invoice.valorNota) : 0,
    type: getInvoiceType(invoice),
    link: getLinks(invoice.links) || [],
    charge: invoice.carga || "-",
    creditDate: formatDate(invoice.dataCredito),
    payer: getInvoicePayer(invoice),
    receivable: getReceivable(invoice),
    document: getDocument(invoice.documento),
  }));
};

export const detailsFromApi = (data = {}) => ({
  isFirstPage: data.first || true,
  isLastPage: data.last || true,
  totalItems: data.totalElements || 0,
  totalPages: data.totalPages || 0,
  numberOfElements: data.numberOfElements || 0,
  currentPage: data.number || 0,
  content: parseContent(data),
});
