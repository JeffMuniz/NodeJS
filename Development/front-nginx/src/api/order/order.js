import get from "lodash/get";
import { toMoneyMask, toCPFMask, toOnlyNumbers } from "@utils";
import httpMethod from "src/api/httpMethod.enum";
import httpRequestHandler from "src/api/httpRequestHandler";
import orderNewDto from "src/api/dtos/orderNew.dto";
import {
  orderStatusToApi,
  ordersToApi,
  resolveOrderDetail,
} from "src/api/dtos/order.dto";
import {
  orderToApiHeader,
  onlineCreditFromApi,
} from "src/api/dtos/orderDetails.dto";

import {
  getAccessToken,
  getClientId,
  getOrderUrl,
  getRHUrl,
  getChargeUrl,
} from "src/modules/UrlManager/UrlManager";
import { getGroupAndUserIdFromState } from "@utils/session";

const URL_RH_API = getRHUrl();
const URL_ORDER_API = `${URL_RH_API}/pedidos`;
const URL_CHARGE_API = getChargeUrl();

const ORDER_BASE_URL = getOrderUrl();
const NEW_URL_ORDER_API = `${ORDER_BASE_URL}/pedidos`;

const onCatch = ({ onError, customMessage }) => e => {
  const messages = Array.isArray(get(e, "data.messages"))
    ? get(e, "data.messages[0]")
    : get(e, "data.messages");

  const errorMessage =
    get(e, "data.erros[0].mensagem") || messages || customMessage;

  onError(errorMessage);
};

export const getOrders = (
  {
    userId,
    companyGroupId,
    orderId,
    orderStatus,
    initialDate,
    finalDate,
    page,
    size = 10,
  },
  injection,
) => {
  const dependencies = { httpRequestHandler, ...injection };
  const url = `${NEW_URL_ORDER_API}/resumo`;
  const params = ordersToApi({
    userId,
    companyGroupId,
    orderId,
    orderStatus,
    initialDate,
    finalDate,
    page,
    size,
  });

  return dependencies.httpRequestHandler({
    method: httpMethod.GET,
    url,
    params,
  });
};

export const getOrder = ({ orderId, idGroup, idUser }, injection) => {
  const dependencies = { httpRequestHandler, ...injection };
  const params = orderToApiHeader({ orderId, idGroup, idUser });
  const url = `${NEW_URL_ORDER_API}/${orderId}`;

  return dependencies.httpRequestHandler({
    method: httpMethod.GET,
    url,
    params,
    headers: {
      access_token: getAccessToken(),
      client_id: getClientId(),
    },
  });
};

export const getOrderConfirmationDetails = async ({
  orderId,
  onSuccess,
  onError,
}) => {
  const {
    groupId: idGrupoEmpresa,
    userId: idUsuario,
  } = getGroupAndUserIdFromState();

  httpRequestHandler({
    method: "GET",
    url: `${NEW_URL_ORDER_API}/${orderId}`,
    params: { idGrupoEmpresa, idUsuario },
    headers: {
      access_token: getAccessToken(),
      client_id: getClientId(),
    },
  })
    .then(response => resolveOrderDetail(response.data))
    .then(order => onSuccess(order))
    .catch(
      onCatch({
        onError,
        customMessage: `Ops... não foi possível acessar os detalhes do pedido ${orderId}`,
      }),
    );
};

export const getAnticipationCredit = async ({ orderId, chargeId, cnpj }) => {
  const {
    groupId: idGrupoEmpresa,
    userId: idUsuario,
  } = getGroupAndUserIdFromState();

  const result = await httpRequestHandler({
    method: "GET",
    url: `${NEW_URL_ORDER_API}/${orderId}/credito-online`,
    params: { idGrupoEmpresa, idUsuario, idCarga: chargeId },
    headers: {
      access_token: getAccessToken(),
      client_id: getClientId(),
    },
  });

  return onlineCreditFromApi(result, cnpj);
};

export const confirmAnticipationCredit = ({
  orderId,
  chargeId,
  onSuccess,
  onError,
  onFinally,
}) => {
  const {
    groupId: idGrupoEmpresa,
    userId: idUsuario,
  } = getGroupAndUserIdFromState();
  const url = `${NEW_URL_ORDER_API}/${orderId}/credito-online`;

  return httpRequestHandler({
    method: "POST",
    url,
    params: { idGrupoEmpresa, idUsuario, idCarga: chargeId },
    headers: {
      access_token: getAccessToken(),
      client_id: getClientId(),
    },
  })
    .then(() => onSuccess())
    .catch(
      onCatch({
        onError,
        customMessage: "Não conseguimos realizar sua solicitação.",
      }),
    )
    .finally(onFinally);
};

export const confirmOrder = ({
  orderId,
  hasOrderCreditAnticipation: antecipaCredito,
  onSuccess,
  onError,
}) => {
  const {
    groupId: idGrupoEmpresa,
    userId: idUsuario,
  } = getGroupAndUserIdFromState();
  const url = `${NEW_URL_ORDER_API}/${orderId}/confirmacao`;

  return httpRequestHandler({
    method: "PUT",
    url,
    params: { idGrupoEmpresa, idUsuario, antecipaCredito },
    headers: {
      access_token: getAccessToken(),
      client_id: getClientId(),
    },
  })
    .then(() => onSuccess())
    .catch(
      onCatch({
        onError,
        customMessage: `Ops... não foi possível confirmar o pedido ${orderId}`,
      }),
    );
};

export const getOrderDetails = (
  {
    idGroup,
    idUser,
    orderId,
    page,
    itemsPerPage,
    cnpj,
    centroCusto,
    onFinally = () => null,
  },
  injection,
) => {
  const dependencies = { httpRequestHandler, ...injection };
  const url = `${NEW_URL_ORDER_API}/${orderId}/cargas/resumo?`;
  const params = {
    idGrupoEmpresa: idGroup,
    idUsuario: idUser,
    paginaAtual: page + 1,
    tamanhoPagina: itemsPerPage || 20,
    cnpj: toOnlyNumbers(cnpj),
    centroCusto,
  };

  return dependencies
    .httpRequestHandler({
      method: httpMethod.GET,
      url,
      params,
    })
    .finally(onFinally);
};

export const getOrderDetailHeader = async (
  { idGroup, idUser, orderId, page },
  injection,
) => {
  const dependencies = { httpRequestHandler, ...injection };
  const url = `${NEW_URL_ORDER_API}/${orderId}`;

  return dependencies.httpRequestHandler({
    method: httpMethod.GET,
    url,
    params: { idGrupoEmpresa: idGroup, idUsuario: idUser, page },
  });
};

export const getOrderNewStatus = async (
  { idGroup, userId, orderId },
  injection,
) => {
  const dependencies = { httpRequestHandler, ...injection };
  const params = orderStatusToApi({ idGroup, userId });
  const url = `${NEW_URL_ORDER_API}/${orderId}/status`;

  const result = dependencies.httpRequestHandler({
    method: httpMethod.GET,
    url,
    params,
    headers: {
      access_token: getAccessToken(),
      client_id: getClientId(),
    },
  });

  return result;
};

export const getOrderDetail = (
  { idUser, idGroup, orderId, chargeId },
  injection,
) => {
  const dependencies = { httpRequestHandler, ...injection };
  const url = `${URL_ORDER_API}/${orderId}/cargas-detalhes`;

  const params = {
    idGrupoEmpresa: idGroup,
    idUsuarioSessao: idUser,
    idCargamaceficio: chargeId,
  };

  const result = dependencies.httpRequestHandler({
    method: httpMethod.GET,
    url,
    params,
    headers: {
      access_token: getAccessToken(),
      client_id: getClientId(),
    },
  });

  return result;
};

export const getOrderDetailThirdLevel = (
  { idUser, idGroup, orderId, chargeId },
  injection,
) => {
  const dependencies = { httpRequestHandler, ...injection };
  const url = `${NEW_URL_ORDER_API}/${orderId}/cargas/${chargeId}`;
  const params = {
    idGrupoEmpresa: idGroup,
    idUsuario: idUser,
  };

  const result = dependencies.httpRequestHandler({
    method: httpMethod.GET,
    url,
    params,
    headers: {
      access_token: getAccessToken(),
      client_id: getClientId(),
    },
  });

  return result;
};

export function newOrder(
  { payload, uploadProgress, onSuccess = () => null, onError = () => null },
  injection,
) {
  const dependencies = { httpRequestHandler, ...injection };
  const url = `${URL_RH_API}/upload`;
  const body = orderNewDto.fromApi(payload);

  const result = dependencies
    .httpRequestHandler({
      method: httpMethod.POST,
      url,
      body,
      headers: {
        client_id: getClientId(),
        access_token: getAccessToken(),
        "Content-Type": "multipart/form-data",
      },
      uploadProgress,
    })
    .then(() => onSuccess())
    .catch(
      onCatch({
        onError,
        customMessage: "Ops... não foi possível importar o pedido.",
      }),
    );

  return result;
}

export async function getOrderErrors({ fileId, page, size }, injection) {
  const dependencies = { httpRequestHandler, ...injection };
  const url = `${URL_ORDER_API}/${fileId}/erros`;
  const params = { page, size };

  return dependencies.httpRequestHandler({
    method: httpMethod.GET,
    url,
    params,
  });
}

export const cancelOrder = (
  { orderId, onSuccess = () => null, onError = () => null },
  injection,
) => {
  const { userId: idUsuario } = getGroupAndUserIdFromState();
  const dependencies = { httpRequestHandler, ...injection };
  const url = `${URL_ORDER_API}/${orderId}/cancelar`;

  const result = dependencies
    .httpRequestHandler({
      method: httpMethod.PUT,
      url,
      params: { idUsuario },
    })
    .then(() => onSuccess())
    .catch(
      onCatch({
        onError,
        customMessage: `Ops... não foi possível cancelar o pedido ${orderId}`,
      }),
    );

  return result;
};

export const getOrderDetailsByCompany = (
  { idUser, chargeId, page, size },
  injection,
) => {
  const dependencies = { httpRequestHandler, ...injection };
  const url = `${URL_RH_API}/cargas/${chargeId}/funcionarios`;
  const params = {
    idUsuarioSessao: idUser,
    page,
    size,
  };

  const result = dependencies.httpRequestHandler({
    method: httpMethod.GET,
    url,
    params,
  });

  return result;
};

export const getOrderCredits = async ({
  chargeId,
  size = 10,
  page,
  status = true,
  nome,
  cpf,
  matricula,
  onError,
  onSuccess,
} = {}) => {
  const url = `${URL_RH_API}/cargas/${chargeId}/funcionarios/creditos`;
  const { userId: idUsuarioSessao } = getGroupAndUserIdFromState();

  const params = {
    idUsuarioSessao,
    size,
    page: page - 1,
    status,
  };

  if (nome) {
    params.nome = nome;
  }

  if (cpf) {
    params.cpf = toOnlyNumbers(cpf);
  }

  if (matricula) {
    params.matricula = matricula;
  }

  httpRequestHandler({
    method: httpMethod.GET,
    url,
    params,
  })
    .then(result => {
      const totalElements = get(result, "data.totalElements", 0);

      const resultList = get(result, "data.content", []);

      const ID_PRODUTO_VA = 1;
      const ID_PRODUTO_VR = 2;
      const ID_PRODUTO_FLEX = 4;

      const credits = resultList.map(credit => {
        const produtos = get(credit, "produtos", []);
        const produtoVA =
          produtos.find(produto => produto.idProduto === ID_PRODUTO_VA) || {};
        const produtoVR =
          produtos.find(produto => produto.idProduto === ID_PRODUTO_VR) || {};
        const produtoFlex =
          produtos.find(produto => produto.idProduto === ID_PRODUTO_FLEX) || {};
        const creditoVA = toMoneyMask(produtoVA.valorCarga || 0);
        const creditoVR = toMoneyMask(produtoVR.valorCarga || 0);
        const creditoFlex = toMoneyMask(produtoFlex.valorCarga || 0);
        const masketCpf = toCPFMask(credit.cpf);

        return { ...credit, creditoVA, creditoVR, creditoFlex, cpf: masketCpf };
      });

      onSuccess({
        totalElements,
        credits,
        messageError: !credits.length
          ? "Não há créditos disponibilizados neste pedido"
          : "",
      });
    })
    .catch(
      onCatch({
        onError,
        customMessage: "Não foi possível obter os créditos deste pedido",
      }),
    );
};

export const getOrderCards = async ({
  chargeId,
  size = 10,
  page,
  nome,
  cpf,
  matricula,
  onError,
  onSuccess,
} = {}) => {
  const url = `${URL_RH_API}/cargas/${chargeId}/funcionarios/cartoes/emitidos`;
  const { userId: idUsuarioSessao } = getGroupAndUserIdFromState();

  const params = {
    idUsuarioSessao,
    size,
    page: page - 1,
  };

  if (nome) {
    params.nome = nome;
  }

  if (cpf) {
    params.cpf = toOnlyNumbers(cpf);
  }

  if (matricula) {
    params.matricula = matricula;
  }

  httpRequestHandler({
    method: httpMethod.GET,
    url,
    params,
  })
    .then(result => {
      const totalElements = get(result, "data.totalElements", 0);

      const resultList = get(result, "data.content", []);

      const cards = resultList.map(card => {
        const masketCpf = toCPFMask(card.cpf);
        const localEntrega = `${card.logradouro} - ${card.bairro} - ${card.cidade}/${card.uf} - ${card.cep}`;
        const geradoCartaoVA = get(card, "geradoCartaoVA", "");
        const geradoCartaoVR = get(card, "geradoCartaoVR", "");
        const geradoCartaomacnai = get(card, "geradoCartaomacnai", "");
        const va = geradoCartaoVA.toUpperCase() === "SIM" ? "Sim" : "";
        const vr = geradoCartaoVR.toUpperCase() === "SIM" ? "Sim" : "";
        const flex = geradoCartaomacnai.toUpperCase() === "SIM" ? "Sim" : "";

        return { ...card, localEntrega, cpf: masketCpf, va, vr, flex };
      });

      onSuccess({
        totalElements,
        cards,
        messageError: !cards.length
          ? "Não há emissão de cartão neste pedido"
          : "",
      });
    })
    .catch(
      onCatch({
        onError,
        customMessage: "Não foi possível obter os dados dos cartões emitidos",
      }),
    );
};

export const checkForTEDsIssue = ({ groupId, userId }) => {
  const dependencies = { httpRequestHandler };
  const url = `${URL_RH_API}/notificacoes/pendencias-ted?idGrupoEmpresa=${groupId}&idUsuario=${userId}`;

  const result = dependencies.httpRequestHandler({
    method: httpMethod.GET,
    url,
  });

  return result;
};

export const cancelCharge = ({ orderId, chargeId, userId }, injection) => {
  const dependencies = { httpRequestHandler, ...injection };
  const url = `${URL_ORDER_API}/${orderId}/cargas-detalhes/${chargeId}/cancelar`;

  const params = { idUsuario: userId };

  const result = dependencies.httpRequestHandler({
    method: httpMethod.PUT,
    url,
    params,
  });

  return result;
};

export const getCostCentersFromOrder = async (idPedido, injection) => {
  try {
    const {
      groupId: idGrupoEmpresa,
      userId: idUsuario,
    } = getGroupAndUserIdFromState();

    const dependencies = { httpRequestHandler, ...injection };
    const url = `${URL_CHARGE_API}/financeiro/centro-custo/recebiveis`;

    const result = await dependencies.httpRequestHandler({
      method: httpMethod.GET,
      url,
      params: { idGrupoEmpresa, idUsuario, idPedido },
    });

    return get(result, "data.centrosCustos", []);
  } catch (error) {
    return error;
  }
};
