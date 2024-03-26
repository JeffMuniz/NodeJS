import httpRequestHandlerLogin from "src/api/httpRequestHandlerLogin";
import httpMethod from "src/api/httpMethod.enum";
import { Krypton, toOnlyNumbers } from "@utils";
import {
  getAuthPath,
  getPublicKey,
  getEnvName,
  getMockData,
} from "src/modules/UrlManager/UrlManager";

const generatedKey = getPublicKey();

export async function signIn({ cpf, password } = {}, injection) {
  const dependencies = { httpRequestHandlerLogin, Krypton, ...injection };
  const krypto = new dependencies.Krypton(generatedKey);

  const { encryptedKey, encryptedData } = await krypto.encrypt({
    cpf: toOnlyNumbers(cpf),
    password,
  });

  const cipheredAuth = await dependencies.httpRequestHandlerLogin({
    method: httpMethod.POST,
    url: `${getAuthPath()}/rh/login`,
    headers: {
      apikey: encryptedKey,
      Authorization: encryptedData,
    },
  });

  const data =
    getEnvName() === "MOCK"
      ? JSON.parse(atob(getMockData()))
      : await krypto.decrypt(cipheredAuth.data);

  return { ...cipheredAuth, data };
}

export function getTimestamp() {
  return httpRequestHandlerLogin({
    method: httpMethod.GET,
    url: `${getAuthPath()}/horario`,
  });
}
