import get from "lodash/get";
import httpMethod from "src/api/httpMethod.enum";
import httpRequestHandler from "src/api/httpRequestHandler";
import { toMoneyMask } from "@utils";
import { getEventUrl } from "src/modules/UrlManager/UrlManager";

const TAXES_LABELS = {
  REEMISSAO_CARTAO: {
    description: "Reemissão de cartão",
    amountLabel: "Número de cartões reemetidos",
    unitValueLabel: "Taxa de reemissão por cartão",
  },
  INDEFINIDO: {
    description: null,
    amountLabel: null,
    unitValueLabel: null,
  },
};

const taxesResolver = taxes =>
  taxes.map(tax => {
    const { description, amountLabel, unitValueLabel } = TAXES_LABELS[
      tax.evento.tipo || "INDEFINIDO"
    ];
    return {
      description,
      unitValue: toMoneyMask(tax.valorUnitario || 0),
      unitValueLabel,
      amount: tax.qntItens,
      amountLabel,
      totalValue: toMoneyMask(tax.valorTotal || 0),
    };
  });

export const getTaxes = ({ orderId, cnpj, onSuccess, onError }) =>
  httpRequestHandler({
    method: httpMethod.GET,
    url: `${getEventUrl()}/vinculados/agrupados`,
    params: { chaveCobranca: orderId, chaveCliente: cnpj },
  })
    .then(response => {
      onSuccess({
        taxes: taxesResolver(response.data.eventos),
        finalValue: toMoneyMask(response.data.valorTotalEventos || 0),
      });
    })
    .catch(e => {
      const errorMessage =
        get(e, "data.erros[0].mensagem") ||
        get(e, "data.messages") ||
        "Não foi possível obter as taxas e tarifas";

      onError(errorMessage);
    });
