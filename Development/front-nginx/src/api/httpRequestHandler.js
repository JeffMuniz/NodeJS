import axios from "axios";
import { Krypton, removeEmptyValues } from "@utils";
import { getClientId, getPublicKey } from "src/modules/UrlManager/UrlManager";
import { getTimestamp } from "src/api/session/session";
import store from "src/redux/configureStore";

const API_CLIENT_ID = getClientId();

const generatedKey = getPublicKey();

const baseHeaders = {
  client_id: API_CLIENT_ID,
};

const baseAxios = axios.create({
  headers: baseHeaders,
});

const axiosUploadProgress = callback => {
  if (!callback) {
    return null;
  }

  return progressEvent => {
    const percentCompleted = Math.round(
      (progressEvent.loaded * 100) / progressEvent.total,
    );
    callback(percentCompleted);
  };
};

export default async function httpRequestHandler({
  method,
  url,
  headers = null,
  body = null,
  params = null,
  skipCrypto = false,
  injection,
  uploadProgress = null,
  responseType = "json",
}) {
  const { validatedTimestamp } = store.getState().session;
  // Basicamente, esse validated é um boolean para saber se o timestamp da maquina esta atualizado
  if (validatedTimestamp) {
    const timestamp = new Date().getTime();
    try {
      const { accessToken, publicKey } = store.getState().session;
      const krypto = new Krypton(generatedKey);
      let headerWithAuth = { ...headers };
      if (publicKey && accessToken && !skipCrypto) {
        const credential = await krypto.generateHash(publicKey, timestamp);
        headerWithAuth = {
          ...headerWithAuth,
          Authorization: `Bearer ${accessToken}`,
          credential,
        };
      }
      const dependencies = { fetch: baseAxios, ...injection };
      const request = {
        method,
        url,
        headers: headerWithAuth,
        data: body,
        params: removeEmptyValues(params),
        onUploadProgress: axiosUploadProgress(uploadProgress),
        responseType,
      };

      return dependencies
        .fetch(request)
        .then(data => Promise.resolve(data))
        .catch(err => Promise.reject(err.response));
    } catch (error) {
      return Promise.reject(error.response);
    }
  } else {
    // Quando o timestamp da maquina estiver desatualizado, é necessario fazer um request para pegar o timestamp do servidor;
    const objTimestamp = await getTimestamp();
    const { timestamp } = objTimestamp.data;
    try {
      const { accessToken, publicKey } = store.getState().session;
      const krypto = new Krypton(generatedKey);
      let headerWithAuth = { ...headers };
      if (publicKey && accessToken && !skipCrypto) {
        const credential = await krypto.generateHash(publicKey, timestamp);
        headerWithAuth = {
          ...headerWithAuth,
          Authorization: `Bearer ${accessToken}`,
          credential,
        };
      }
      const dependencies = { fetch: baseAxios, ...injection };
      const request = {
        method,
        url,
        headers: headerWithAuth,
        data: body,
        params: removeEmptyValues(params),
        onUploadProgress: axiosUploadProgress(uploadProgress),
        responseType,
      };
      return dependencies
        .fetch(request)
        .then(data => Promise.resolve(data))
        .catch(err => Promise.reject(err.response));
    } catch (error) {
      return Promise.reject(error.response);
    }
  }
}
