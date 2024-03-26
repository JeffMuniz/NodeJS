import { persianRed, green, warningYellow, blue, shark } from "@colors";

const OrderStatusEnum = {
  VALIDANDO_ARQUIVO: {
    description: "Validando Arquivo",
    color: blue,
    icon: "pendingStatus",
    iconColor: blue,
    buttonText: "Cancelar Pedido",
    hasAction: true,
  },
  PROCESSANDO: {
    description: "Processando",
    color: blue,
    icon: "pendingStatus",
    iconColor: blue,
    buttonText: "Cancelar Pedido",
    hasAction: true,
  },
  INVALIDADO: {
    description: "Invalidado",
    color: persianRed,
    icon: "warning",
    iconColor: persianRed,
    actionIcon: "arrowDownBlack",
    hasAction: true,
    buttonText: "Ver Inconsistências",
    actionName: "handleClickErrors",
    actionColor: persianRed,
  },
  CONCLUIDO: {
    description: "Concluído",
    color: green,
    icon: "deliveredStatus",
    iconColor: green,
    actionIcon: "arrowDownBlack",
    hasAction: true,
    buttonText: "Cancelar Pedido",
    actionName: "handleClickCancel",
    actionColor: green,
  },
  VALIDADO_PARCIAL: {
    description: "Validado Parcial",
    color: blue,
    icon: "pendingStatus",
    iconColor: blue,
  },
  CANCELADO: {
    description: "Cancelado",
    color: persianRed,
    icon: "cancelledStatus",
    iconColor: persianRed,
  },
  CANCELADO_PARCIAL: {
    description: "Cancelado Parcial",
    color: warningYellow,
    icon: "deliveredStatus",
    iconColor: warningYellow,
  },
  AGUARDANDO_CONFIRMACAO: {
    description: "Aguardando Confirmação",
    color: shark,
    icon: "pendingStatus",
    iconColor: shark,
    // buttonText: "Cancelar Pedido",
    // hasAction: true,
  },
  EXPIRADO: {
    description: "Expirado",
    color: persianRed,
    icon: "warning",
    iconColor: persianRed,
  },
};

export default OrderStatusEnum;
