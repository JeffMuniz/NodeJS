import DateManager from "moment";
import isArray from "lodash/isArray";
import { toMoneyMask, toCNPJMask } from "@utils";
import { dateHourFormats, invoiceType, statusUnifiedInvoice } from "@enums";

const formatDate = field => {
  if (field) {
    return DateManager(field)
      .startOf("day")
      .format(dateHourFormats.longDateSlash);
  }
  return "-";
};

const unificationTypes = {
  UNIFICADO_VA: "Unificado por VA",
  UNIFICADO_VR: "Unificado por VR",
  UNIFICADO_TODOS_PRODUTOS: "Todos os produtos",
  UNIFICADO_FLEX: "Unificado Flex",
  INDEFINIDO: "-",
};

const getStatus = statusInvoice => {
  const foundStatus = statusUnifiedInvoice.find(
    status => status.value === statusInvoice,
  );

  return foundStatus || {};
};

const getPaymentDescription = paymentType => {
  const type = invoiceType[paymentType];

  return type ? type.description : "";
};

const parseContent = data => {
  if (!isArray(data)) return [];

  return data.map(item => {
    const statusDetail = getStatus(item.statusFatura);
    const status = statusDetail.description || item.statusFatura;
    const statusColor = statusDetail.color;

    return {
      invoiceId: item.idFatura || "-",
      cnpj: item.cnpjPagador ? toCNPJMask(item.cnpjPagador) : "-",
      amount: item.valorTotal ? toMoneyMask(item.valorTotal) : toMoneyMask(0),
      dueDate: formatDate(item.dataVencimento),
      unificationType: unificationTypes[item.tipoUnificacao || "INDEFINIDO"],
      unificationTypeEnum: item.tipoUnificacao,
      status,
      statusColor,
      statusEnum: item.statusFatura,
      totalOrders: item.qtdPedidos,
      invoiceDate: formatDate(item.disponibilizacaoNotaFiscal) || "",
      invoiceStatus: item.statusNotaFiscal,
      paymentType: item.formaPagamento,
      allowRpsDownload: item.emissaoDocumentoZerado,
      showDocuments: !!item.exibeDocumentos,
      costCenter: item.centroCusto || "N/D",
    };
  });
};

export const fromApi = (data = {}) => {
  const { faturasUnificadas, meta } = data;

  return {
    totalItems: meta.total || 0,
    content: parseContent(faturasUnificadas),
  };
};

export const invoiceDetailFromApi = (data = {}) => {
  const statusDetail = getStatus(data.statusFatura);
  const status = statusDetail.description || data.statusFatura;
  const statusColor = statusDetail.color;

  return {
    invoiceId: data.idFatura || "-",
    totalOrders: data.qtdPedidos,
    cnpj: data.cnpjPagador ? toCNPJMask(data.cnpjPagador) : "-",
    companyName: data.razaoSocialPagador,
    dueDate: formatDate(data.dataVencimento),
    unificationType: unificationTypes[data.tipoUnificacao || "INDEFINIDO"],
    paymentType: getPaymentDescription(data.formaPagamento),
    status,
    statusColor,
    statusEnum: data.statusFatura,
    macAlimen: data.totalVA ? toMoneyMask(data.totalVA) : toMoneyMask(0),
    macRefei: data.totalVR ? toMoneyMask(data.totalVR) : toMoneyMask(0),
    discount: data.desconto
      ? `- ${toMoneyMask(data.desconto)}`
      : `- ${toMoneyMask(0)}`,
    rebate: data.rebate
      ? `- ${toMoneyMask(data.rebate)}`
      : `- ${toMoneyMask(0)}`,
    amount: data.valorTotal ? toMoneyMask(data.valorTotal) : toMoneyMask(0),
    allowRpsDownload: data.emissaoDocumentoZerado,
    showDocuments: !!data.exibeDocumentos,
  };
};

const parseContentOrders = data => {
  if (!isArray(data)) return [];

  return data.map(item => ({
    orderId: item.idPedido,
    chargeId: item.idCarga,
    cnpj: item.cnpj ? toCNPJMask(item.cnpj) : "-",
    orderDate: formatDate(item.dataPedido),
    creditDate: formatDate(item.dataCredito),
    amount: item.valorTotal ? toMoneyMask(item.valorTotal) : toMoneyMask(0),
    totalEmployees: item.qtdFuncionarios,
  }));
};

export const ordersByInvoiceFromApi = (data = {}) => {
  const { cargasPedidos, meta } = data;

  return {
    totalItems: meta.total || 0,
    content: parseContentOrders(cargasPedidos),
  };
};
