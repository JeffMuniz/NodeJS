import httpMethod from "src/api/httpMethod.enum";
import httpRequestHandler from "src/api/httpRequestHandler";
import { getAuthPath, getPublicKey } from "src/modules/UrlManager/UrlManager";
import { Krypton } from "@utils";

const generatedKey = getPublicKey();

const URL = `${getAuthPath()}/auto-ec/oauth`;

export async function getCode(injection) {
  const dependencies = { httpRequestHandler, ...injection };

  const result = await dependencies.httpRequestHandler({
    url: `${URL}/codes`,
    responseType: "text",
    method: httpMethod.POST,
  });

  return result;
}

export async function validateCode({ code }, injection) {
  const dependencies = { httpRequestHandler, Krypton, ...injection };

  const krypto = new dependencies.Krypton(generatedKey);

  const { encryptedKey, encryptedData } = await krypto.encrypt(code);

  const cipheredAuth = await dependencies.httpRequestHandler({
    url: `${URL}/tokens`,
    responseType: "text",
    method: httpMethod.POST,
    headers: {
      apikey: encryptedKey,
      code: encryptedData,
    },
  });
  const data = await krypto.decrypt(cipheredAuth.data);

  return { ...cipheredAuth, data };
}
