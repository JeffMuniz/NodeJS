import { paymentTypes, revenuesTypes } from "@enums";

export default class GroupDto {
  constructor(data = {}) {
    this.id = data.id;
    this.name = data.name;
  }

  static fromApi(data = {}) {
    const object = {
      idPermission: data.id,
      id: (data.grupoEmpresa && data.grupoEmpresa.id) || data.idGrupo,
      name: (data.grupoEmpresa && data.grupoEmpresa.nomeGrupo) || data.nome,
    };

    return { ...object };
  }
}

export const paramsFromApi = ({ data } = {}) => ({
  params: {
    deliveryType: data.TIPO_ENTREGA_CARTAO,
    paymentType: paymentTypes[data.FORMA_PAGAMENTO],
    revenues: revenuesTypes[data.FLAG_FATURAMENTO_CENTRALIZADO],
    billingType: data.TIPO_FATURAMENTO,
    isUnifiedInvoice:
      data.TIPO_FATURAMENTO && data.TIPO_FATURAMENTO !== "SIMPLES",
    isPrepaid: data.TIPO_CONTRATO === "PRE",
  },
});

export const ordersLimitFromApi = ({ data }) => ({
  ordersLimit: {
    percentage: data.porcentagemUtilizado,
    availableValue: data.valorDisponivel,
    usedLimit: data.valorUtilizado,
    totalLimit: data.valorLimiteDisponivel,
    checkForLimit: data.validaLimite,
  },
});
