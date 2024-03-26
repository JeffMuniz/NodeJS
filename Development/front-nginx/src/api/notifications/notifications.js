import httpMethod from "src/api/httpMethod.enum";
import httpRequestHandler from "src/api/httpRequestHandler";
import store from "src/redux/configureStore";
import { getPermissionUrl, getRHUrl } from "src/modules/UrlManager/UrlManager";

const URL_RH_API = getRHUrl();
const URL_PERMISSION_API = getPermissionUrl();
const URL_NOTIFICATIONS_API = `${URL_RH_API}/notificacoes`;
const URL_NOTIFICATIONS_ORDER_API = `${URL_NOTIFICATIONS_API}/pedidos`;
const URL_NOTIFICATIONS_DELIVERY_PLACES_API = `${URL_NOTIFICATIONS_API}/unidades-entrega/processando`;
const URL_NOTIFICATIONS_POST_CONTRACT = `${URL_PERMISSION_API}/parametros-contrato`;

export const getDefaultParams = () => {
  const {
    user: {
      profile: {
        data: { id: userId },
      },
    },
    selectedCompanyTree: {
      selectedGroup: { id: groupId },
    },
  } = store.getState();

  return { userId, groupId };
};

export const getNotifications = ({ userId, groupId, notificationType }) =>
  httpRequestHandler({
    method: httpMethod.GET,
    url: URL_NOTIFICATIONS_API,
    params: {
      idGrupoEmpresa: groupId,
      idUsuario: userId,
      tipoNotificacao: notificationType,
    },
  });

export const getOrderNotifications = ({ userId, groupId }) => {
  const url = URL_NOTIFICATIONS_ORDER_API;
  const params = { idUsuario: userId, idGrupoEmpresa: groupId };

  return httpRequestHandler({
    method: httpMethod.GET,
    url,
    params,
  });
};

export const postNotificationContract = () => {
  const { userId, groupId } = getDefaultParams();
  const url = URL_NOTIFICATIONS_POST_CONTRACT;
  const params = { idUsuario: userId, idGrupoEmpresa: groupId };

  return httpRequestHandler({
    method: httpMethod.POST,
    url,
    params,
  });
};

export const getDeliveryPlaceNotifications = ({ userId, groupId }) =>
  httpRequestHandler({
    method: httpMethod.GET,
    url: URL_NOTIFICATIONS_DELIVERY_PLACES_API,
    params: { idUsuario: userId, idGrupoEmpresa: groupId },
  });
