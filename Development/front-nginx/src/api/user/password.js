import httpMethod from "src/api/httpMethod.enum";
import httpRequestHandler from "src/api/httpRequestHandler";
import { getRHUrl } from "src/modules/UrlManager/UrlManager";
import { toOnlyNumbers } from "@utils";

export async function createPassword(token, newPassword, injection) {
  const dependencies = { httpRequestHandler, ...injection };
  const url = `${getRHUrl()}/usuarios/senhas/${token}`;
  const body = { novaSenha: newPassword };

  const result = await dependencies.httpRequestHandler({
    method: httpMethod.PUT,
    url,
    body,
  });

  return result;
}

export async function forgotPassword({ cpf, email }, injection) {
  const url = `${getRHUrl()}/usuarios/senhas?operacao=esqueci-senha`;
  const dependencies = { httpRequestHandler, ...injection };
  const result = await dependencies.httpRequestHandler({
    url,
    method: httpMethod.PUT,
    body: {
      cpf: toOnlyNumbers(cpf),
      email,
      plataforma: "RH",
    },
  });

  return result;
}
