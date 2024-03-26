import { getRHUrl } from "src/modules/UrlManager/UrlManager";
import httpRequestHandler from "src/api/httpRequestHandler";
import httpMethod from "src/api/httpMethod.enum";

import { formatDateToApi, toOnlyNumbers } from "@utils";

const parseHeaders = ({ alreadyAllowed, cpf }) => {
  let method = httpMethod.POST;
  let url = `${getRHUrl()}/usuarios/hierarquia-acessos`;

  if (alreadyAllowed) {
    method = httpMethod.PUT;
    url = `${getRHUrl()}/usuarios/${cpf}/hierarquia-acessos`;
  }

  return { method, url };
};

const formattedValues = (birthDate, phone) => {
  const formattedBirthDate = birthDate ? formatDateToApi(birthDate) : null;
  const formattedPhone = phone ? toOnlyNumbers(phone) : null;

  let ddd = null;
  let phoneNumber = null;

  if (formattedPhone) {
    ddd = formattedPhone.substring(0, 2);
    phoneNumber = formattedPhone.substring(2);
  }

  return { formattedBirthDate, ddd, phoneNumber };
};

export default async function setUserPermission({
  idsAccessLevel: idsNivelAcesso,
  accessLevel: nivelAcesso,
  alreadyAllowed,
  selectedUser,
  idSessionUser: idUsuarioLogado,
  idGroup: idGrupoEmpresa,
}) {
  const {
    cpf,
    name: nome,
    email,
    birthDate,
    phone,
    mother: nomeMae,
  } = selectedUser;
  const { method, url } = parseHeaders({ alreadyAllowed, cpf });

  const { formattedBirthDate, ddd, phoneNumber } = formattedValues(
    birthDate,
    phone,
  );

  const body = {
    cpf,
    idsNivelAcesso,
    nivelAcesso,
    nome,
    email: email.toLowerCase(),
    idUsuarioLogado,
    idGrupoEmpresa,
    dataNascimento: formattedBirthDate,
    ddd,
    telefone: phoneNumber,
    nomeMae: nomeMae || null,
  };

  const response = await httpRequestHandler({
    url,
    method,
    body,
  });

  return response.data;
}

export async function setUserEdit({
  id,
  cpf,
  name,
  email,
  mother,
  birthDate,
  phone,
  idUserLogged,
}) {
  const method = httpMethod.PUT;
  const url = `${getRHUrl()}/usuarios/${id}`;

  const { formattedBirthDate, ddd, phoneNumber } = formattedValues(
    birthDate,
    phone,
  );

  const body = {
    cpf,
    nome: name,
    email,
    dataNascimento: formattedBirthDate,
    ddd,
    telefone: phoneNumber,
    nomeMae: mother || null,
    idUsuarioLogado: idUserLogged,
  };

  const response = await httpRequestHandler({
    url,
    method,
    body,
  });

  return response.data;
}
