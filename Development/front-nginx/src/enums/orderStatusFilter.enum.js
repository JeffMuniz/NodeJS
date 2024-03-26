const OrderStatusFilterEnum = [
  { key: 0, description: "Todos", api: "", label: "orderStatus" },
  {
    key: 1,
    description: "Validando Arquivo",
    api: "VALIDANDO_ARQUIVO",
    label: "orderStatus",
  },
  {
    key: 2,
    description: "Processando",
    api: "PROCESSANDO",
    label: "orderStatus",
  },
  {
    key: 3,
    description: "Aguardando Confirmação",
    api: "AGUARDANDO_CONFIRMACAO",
    label: "orderStatus",
  },
  { key: 6, description: "Concluído", api: "CONCLUIDO", label: "orderStatus" },
  {
    key: 7,
    description: "Invalidado",
    api: "INVALIDADO",
    label: "orderStatus",
  },
  { key: 8, description: "Cancelado", api: "CANCELADO", label: "orderStatus" },
  {
    key: 9,
    description: "Cancelado Parcial",
    api: "CANCELADO_PARCIAL",
    label: "orderStatus",
  },
];

export default OrderStatusFilterEnum;
