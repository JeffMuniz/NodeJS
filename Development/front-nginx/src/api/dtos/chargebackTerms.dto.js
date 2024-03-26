import DateManager from "src/modules/DateManager/DateManager";
import { dateHourFormats } from "@enums";
import { toZipCode, mountAddress } from "@utils";

const address = data => ({
  neighborhood: data.bairro || "",
  zipcode: toZipCode(data.cep) || "",
  city: data.cidade || "",
  complement: data.complemento || "",
  street: data.logradouro || "",
  number: data.numero || "",
  state: data.estado || "",
});

export const fromApi = data => {
  if (!data) return null;

  const object = {
    id: data.id_termo || "",
    city: data.cidade || "",
    cnpj: data.cnpj || "",
    acceptDate:
      DateManager.utc(data.data_aceite).format(dateHourFormats.longDateSlash) ||
      "--",
    company: data.empresa || "",
    address: address(data.endereco) || "",
    mountedAddress: mountAddress(data.endereco) || "--",
    reason: data.motivo || "",
    type: data.tipo || "estorno",
    day: DateManager.utc(data.data_aceite).format("DD") || "--",
    month: DateManager.utc(data.data_aceite).format("MM") || "--",
    year: DateManager.utc(data.data_aceite).format("YYYY") || "--",
  };

  return { ...object };
};
