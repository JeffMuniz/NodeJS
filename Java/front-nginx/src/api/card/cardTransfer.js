import httpMethod from "src/api/httpMethod.enum";
import { getTransferUrl } from "src/modules/UrlManager/UrlManager";
import httpRequestHandler from "../httpRequestHandler";
import {
  cardTransferFromApi,
  cardTransferToApi,
} from "../dtos/cardTransfer.dto";

export const getTransferConfig = async (cnpj, idUsuario) => {
  const result = await httpRequestHandler({
    url: `${getTransferUrl()}/produtos/${cnpj}/id-usuario/${idUsuario}`,
    method: httpMethod.GET,
  });

  return result.data;
};

export const getValuesTransfer = async cnpj => {
  const result = await httpRequestHandler({
    url: `${getTransferUrl()}/${cnpj}`,
    method: httpMethod.GET,
  });

  const { data } = result;
  return cardTransferFromApi(data);
};

export const setTransferConfig = async data => {
  const url = `${getTransferUrl()}`;

  const result = await httpRequestHandler({
    url,
    method: httpMethod.POST,
    body: cardTransferToApi(data),
  });

  return result.data;
};
