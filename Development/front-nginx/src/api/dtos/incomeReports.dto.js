import { toCNPJMask } from "@utils";

const entity = data => ({
  id: data.id,
  cnpj: toCNPJMask(data.cnpj),
  name: data.razaoSocial,
  year: data.ano,
  key: data.chave,
});

const parseContent = content => {
  if (!Array.isArray(content)) {
    return [];
  }

  return content.map(el => entity(el));
};

export const fromApi = (data = {}) => ({
  isFirstPage: data.first || true,
  isLastPage: data.last || true,
  totalItems: data.totalElements || 0,
  totalPages: data.totalPages || 0,
  numberOfElements: data.numberOfElements || 0,
  currentPage: data.number || 0,
  content: parseContent(data.content || []),
});
