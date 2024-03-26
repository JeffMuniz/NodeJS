import DateManager from "src/modules/DateManager/DateManager";
import { toMoneyMask } from "@utils";
import { persianRed, green } from "@colors";
import { dateHourFormats } from "@enums";

const parseAmount = (amount, type) => {
  if (amount) {
    return type === "Débito" || amount < 0
      ? `- ${toMoneyMask(amount)}`
      : `+ ${toMoneyMask(amount)}`;
  }
  return "--";
};

const entity = data => ({
  date:
    DateManager(data.dataMovimento, dateHourFormats.longNodeDateHour).format(
      dateHourFormats.longDateSlash,
    ) || "--",
  origin: data.tipoMovimento,
  description: data.motivoAjuste,
  amount: parseAmount(data.totalConsolidado, data.tipoMovimento),
  amountColor:
    data.tipoMovimento === "Débito" || data.totalConsolidado < 0
      ? persianRed
      : green,
  key: data.dataMovimento,
});

const parseContent = content => {
  if (!Array.isArray(content)) {
    return [];
  }

  return content.map(el => entity(el));
};

export const fromApi = (data = {}) => ({
  isFirstPage: data.page.first || true,
  isLastPage: data.page.last || true,
  totalItems: data.page.totalElements || 0,
  totalPages: data.page.totalPages || 0,
  numberOfElements: data.page.numberOfElements || 0,
  currentPage: data.page.number || 0,
  content: parseContent(data.results || []),
});

export const companyBalanceFromApi = (data = {}) => ({
  company: {
    cnpj: data.empresa.cnpj || "",
    id: data.empresa.id || "",
    name: data.empresa.razao_social || "",
  },
  type: data.faturamento || "",
  amount: data.saldo || 0,
});

export const groupBalanceFromApi = (data = {}) => ({
  type: data.faturamento || "",
  amount: data.saldo || 0,
});
