import { red, green, blue, darkYellow, persianRed, chartOrange } from "@colors";

const OrderStatusEnum = {
  AGUARDANDO_CONFIRMACAO: {
    description: "Aguardando Confirmação",
    key: "Aguardando Confirmação",
    color: darkYellow,
    iconColor: darkYellow,
  },
  AGUARDANDO_PAGAMENTO: {
    description: "Aguardando pagamento",
    key: "Aguardando Pagamento",
    color: darkYellow,
    iconColor: darkYellow,
  },
  PEDIDO_CONFIRMADO: {
    description: "Agendado",
    key: "Pedido Confirmado",
    color: green,
    icon: "check",
    iconColor: green,
  },
  PEDIDO_CANCELADO: {
    description: "Cancelado",
    key: "Pedido Cancelado",
    color: persianRed,
    icon: "cancelledStatus",
    iconColor: persianRed,
  },
  PEDIDO_PROCESSADO: {
    description: "Disponível",
    key: "Pedido Processado",
    color: green,
    iconColor: green,
  },
  CARGA_PROCESSANDO: {
    description: "Processando",
    key: "Carga Processando",
    color: blue,
    iconColor: blue,
  },
  PENDENCIA_LIMITE: {
    description: "Pendencia de Limite",
    key: "Pendencia de Limite",
    icon: "warning",
    iconColor: chartOrange,
    color: persianRed,
  },
  EXPIRADO: {
    description: "Pedido expirado",
    key: "Expirado",
    icon: "warning",
    iconColor: red,
    color: darkYellow,
  },
};

export default OrderStatusEnum;
