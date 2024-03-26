import DateManager from "src/modules/DateManager/DateManager";
import { dateHourFormats } from "@enums";

export const userInfoFromApi = (data = {}) => {
  const { ddd, telefone } = data;

  const dddValue = ddd;
  const phoneNumber = telefone;

  let phone = null;

  if (dddValue && phoneNumber) {
    phone = dddValue + phoneNumber;
  }

  const object = {
    id: data.id || null,
    cpf: data.cpf,
    name: data.nome || null,
    email: data.email || null,
    birthDate: data.dataNascimento
      ? DateManager.utc(data.dataNascimento).format(
          dateHourFormats.longDateSlash,
        )
      : "",
    mother: data.nomeMae || null,
    phone,
    anonimizado: data.anonimizado,
    status: data.status || null,
  };

  return { ...object };
};
