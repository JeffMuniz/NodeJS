import { toZipCodeMask, toOnlyNumbers } from "@utils";

export default class DeliveryPlacesDto {
  constructor(data = {}) {
    this.file = data.id || "";
    this.idUser = data.idUser || "";
    this.idGroup = data.idGroup || "";
  }

  static toApi(data = {}) {
    const formData = new FormData();

    formData.append("file", data.file);
    formData.append("idGrupoEmpresa", data.idGroup);
    formData.append("idUsuario", data.idUser);

    return formData;
  }
}

const DeliveryPlaceDTO = (data = {}) => ({
  id: data.id,
  deliveryPlaceCode: data.codigoUnidadeEntrega,
  placeId: data.codigoUnidadeEntrega || "",
  address: `${data.logradouro || ""} ${data.endereco ||
    ""}, ${data.enderecoNumero || ""}${
    data.enderecoComplemento ? `, ${data.enderecoComplemento}` : ""
  }, ${data.bairro || ""} CEP: ${
    data.cep ? toZipCodeMask(data.cep) : ""
  }, ${data.cidade || ""} - ${data.uf || ""} `,
  firstContactName: data.nomeResponsavel1 || "",
  firstContactDoc: data.documentoResponsavel1 || "",
  firstContactDocType: data.tipoDocumentoResponsavel1 || "",
  secondContactName: data.nomeResponsavel2 || "",
  secondContactDoc: data.documentoResponsavel2 || "",
  secondContactDocType: data.tipoDocumentoResponsavel2 || "",
});

export const fromApi = (data = {}) => ({
  isFirstPage: data.first || true,
  isLastPage: data.last || true,
  totalItems: data.totalElements || 0,
  totalPages: data.totalPages || 0,
  numberOfElements: data.numberOfElements || 0,
  currentPage: data.number || 0,
  content: data.content.map(dp => DeliveryPlaceDTO(dp)),
});

export const situationFromApi = ({
  existeUnidadeEntregaCadastrada,
  existeArquivoDeUnidadeEntregaEmProcessamento,
} = {}) => ({
  thereIsActiveDP: existeUnidadeEntregaCadastrada,
  thereIsSheetProcessing: existeArquivoDeUnidadeEntregaEmProcessamento,
});

const deliveryPlacesError = (data = {}) => {
  const object = {
    line: data.linha,
    error: data.erro,
  };
  return { ...object };
};

export const deliveryPlacesErrorsFromApi = (data = {}) => {
  const object = {
    content: data.content.map(error => deliveryPlacesError(error)),
    totalItems: data.totalElements,
  };

  return { ...object };
};

export const toApiDeliveyPlaceManually = (data = {}) => ({
  idGrupoEmpresa: parseInt(data.companyGroupId, 10),
  nomeUnidadeEntrega: data.deliveryName,
  cep: toOnlyNumbers(data.zipcode),
  nomePrimeiroResponsavel: data.firstPersonName,
  rgPrimeiroResponsavel: data.firstRg,
  telefonePrimeiroResponsavel: toOnlyNumbers(data.firstPhone),
  nomeSegundoResponsavel: data.secondPersonName,
  rgSegundoResponsavel: data.secondRg,
  telefoneSegundoResponsavel: toOnlyNumbers(data.secondPhone),
  endereco: data.address,
  numero: data.number,
  complemento: data.complement,
  bairro: data.neighborhood,
  cidade: data.city,
  estado: data.state.name,
  idUsuarioLogado: data.loggedUserId,
});

export const toPutApiDeliveyPlaceManually = (data = {}) => ({
  nomeUnidadeEntrega: data.deliveryName,
  cep: toOnlyNumbers(data.zipcode),
  nomePrimeiroResponsavel: data.firstPersonName,
  rgPrimeiroResponsavel: data.firstRg,
  telefonePrimeiroResponsavel: toOnlyNumbers(data.firstPhone),
  nomeSegundoResponsavel: data.secondPersonName,
  rgSegundoResponsavel: data.secondRg,
  telefoneSegundoResponsavel: toOnlyNumbers(data.secondPhone),
  endereco: data.address,
  numero: data.number,
  complemento: data.complement,
  bairro: data.neighborhood,
  cidade: data.city,
  estado: data.state.name,
  idUsuarioLogado: data.loggedUserId,
});

export const fromDeliveryPlaceDetailApi = (data = {}) => ({
  id: data.id,
  // companyGroupId: data.idGrupoEmpresa,
  deliveryName: data.codigoUnidadeEntrega,
  // updateStatusDate: data.dataStatus,
  // createDate: data.dataRegistro,
  // status: data.status,
  address: data.logradouro
    ? `${data.logradouro} ${data.endereco}`
    : `${data.endereco}`,
  number: data.enderecoNumero,
  complement: data.enderecoComplemento,
  neighborhood: data.bairro,
  city: data.cidade,
  uf: data.uf,
  zipcode: toZipCodeMask(data.cep),
  firstPersonName: data.nomeResponsavel1,
  firstRg:
    data.tipoDocumentoResponsavel1 === "RG" ? data.documentoResponsavel1 : "",
  firstPhone: data.telefoneResponsavel1,
  secondPersonName: data.nomeResponsavel2,
  secondRg:
    data.tipoDocumentoResponsavel2 === "RG" ? data.documentoResponsavel2 : "",
  secondPhone: data.telefoneResponsavel2,
});
