import { report, dateHourFormats } from "@enums";
import DateManager from "src/modules/DateManager/DateManager";

const { statuses } = report;

const entity = data => ({
  id: data.id,
  requestDate: DateManager.utc(data.dataSolicitacao).format(
    dateHourFormats.longDateHour,
  ),
  rangeDate: [
    DateManager.utc(data.dataInicio).format(dateHourFormats.longDateSlash),
    DateManager.utc(data.dataFim).format(dateHourFormats.longDateSlash),
  ],
  type: data.nomeRelatorio,
  canDelete: statuses[data.status].canDelete,
  canDownload: statuses[data.status].canDownload,
  status: statuses[data.status].value,
  statusColor: statuses[data.status].color,
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

const createIdentification = ({ userId, groupId }) => ({
  identificacao: {
    idUsuario: userId,
    idGrupoEmpresa: groupId,
  },
});

export const toApiCreate = ({ startDate, endDate, userId, groupId }) => ({
  periodoRequest: {
    dataInicio: startDate,
    dataFim: endDate,
  },
  ...createIdentification({ userId, groupId }),
});

export const toApiDelete = ({ userId, groupId, ids }) => ({
  idsRelatorio: ids,
  ...createIdentification({ userId, groupId }),
});
