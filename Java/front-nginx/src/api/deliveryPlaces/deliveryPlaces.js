import httpMethod from "src/api/httpMethod.enum";
import httpRequestHandler from "src/api/httpRequestHandler";

import deliveryPlacesDto, {
  toApiDeliveyPlaceManually,
  toPutApiDeliveyPlaceManually,
  fromDeliveryPlaceDetailApi,
} from "src/api/dtos/deliveryPlaces.dto";
import { getRHUrl } from "src/modules/UrlManager/UrlManager";

const URL_RH_API = getRHUrl();

export function newDeliveryPlaces(payload, uploadProgress, injection) {
  const dependencies = { httpRequestHandler, ...injection };
  const url = `${URL_RH_API}/unidades-entrega/upload`;
  const body = deliveryPlacesDto.toApi(payload);

  const result = dependencies.httpRequestHandler({
    method: httpMethod.POST,
    url,
    body,
    headers: {
      "Content-Type": "multipart/form-data",
    },
    uploadProgress,
  });

  return result;
}

export function postDeliveryPlaceManually(
  values,
  companyGroupId,
  loggedUserId,
  injection,
) {
  const dependencies = { httpRequestHandler, ...injection };
  const url = `${URL_RH_API}/unidades-entrega`;

  const body = toApiDeliveyPlaceManually({
    ...values,
    companyGroupId,
    loggedUserId,
  });

  return dependencies.httpRequestHandler({
    method: httpMethod.POST,
    url,
    body,
  });
}

export async function getDeliveryPlaceDetail(deliveryPlaceId, injection) {
  const dependencies = { httpRequestHandler, ...injection };
  const url = `${URL_RH_API}/unidades-entrega/${deliveryPlaceId}`;

  const response = await dependencies.httpRequestHandler({
    method: httpMethod.GET,
    url,
  });

  return fromDeliveryPlaceDetailApi(response.data);
}

export function putDeliveryPlaceManually(
  values,
  companyGroupId,
  loggedUserId,
  deliveryPlaceId,
  injection,
) {
  const dependencies = { httpRequestHandler, ...injection };
  const url = `${URL_RH_API}/unidades-entrega/${deliveryPlaceId}`;

  const body = toPutApiDeliveyPlaceManually({
    ...values,
    companyGroupId,
    loggedUserId,
  });

  return dependencies.httpRequestHandler({
    method: httpMethod.PUT,
    url,
    body,
  });
}
