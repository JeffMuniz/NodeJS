import {
  lighterBlack,
  persianRed,
  darkGreen,
  chartOrange,
  middleYellow,
} from "@colors";

export default [
  { key: 0, value: null, description: "Todos" },
  { key: 1, value: "EM_ABERTO", description: "Em aberto", color: lighterBlack },
  {
    key: 2,
    value: "PENDENTE_PROCESSAMENTO",
    description: "Pendente Processamento",
    color: middleYellow,
  },
  {
    key: 3,
    value: "PENDENTE_PAGAMENTO",
    description: "Pendente Pagamento",
    color: chartOrange,
  },
  { key: 4, value: "PAGO", description: "Pago", color: darkGreen },
  { key: 5, value: "CANCELADO", description: "Cancelado", color: persianRed },
];
