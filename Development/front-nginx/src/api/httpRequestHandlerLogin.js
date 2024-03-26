import axios from "axios";

import { Krypton, removeEmptyValues } from "@utils";
import { getClientId, getPublicKey } from "src/modules/UrlManager/UrlManager";
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

export default async function httpRequestHandlerLogin({
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
  try {
    const { accessToken, publicKey, timestamp } = store.getState().session;
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
