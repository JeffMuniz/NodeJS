import { red, green, blue } from "@colors";

const InvoiceStatusEnum = {
  PENDENTE: {
    description: "Processando",
    status: 0,
    color: blue,
  },
  ENVIADO_REGISTRO: {
    description: "Processando",
    status: 4,
    color: blue,
  },
  REGISTRADO: {
    description: "Aguardando Pagamento",
    status: 1,
    color: blue,
  },
  PAGO: {
    description: "Pagamento Confirmado",
    status: 2,
    color: green,
  },
  CANCELADO: {
    description: "Cancelado",
    status: 3,
    color: red,
  },
  ERRO: {
    description: "Processando",
    status: 9,
    color: blue,
  },
};

export default InvoiceStatusEnum;
