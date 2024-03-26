import { blue, warningYellow, darkGreen } from "@colors";

const statuses = {
  PROCESSANDO: {
    name: "PROCESSING",
    value: "Processando...",
    color: blue,
  },
  NAO_HA_PEDIDOS: {
    name: "NO_REPORT_FOUND",
    value: "Não há pedidos",
    color: warningYellow,
    canDelete: true,
  },
  PROCESSADO: {
    name: "PROCESSED",
    value: "Processado",
    color: darkGreen,
    canDownload: true,
    canDelete: true,
  },
};

export default {
  statuses,
};
