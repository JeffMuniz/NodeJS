import { red, darkGreen, chartOrange } from "@colors";

const chargeBackStatus = {
  PROCESSANDO: {
    description: "Processando",
    status: 0,
    color: chartOrange,
  },
  REGISTRADO: {
    description: "Processando",
    status: 0,
    color: chartOrange,
  },
  CONCLUÍDO: {
    description: "Concluído",
    status: 1,
    color: darkGreen,
  },
  ERRO: {
    description: "Erro",
    status: 9,
    color: red,
  },
};

export default chargeBackStatus;
