
declare namespace EstablishmentService {
  type GetDetailParams = {
    cnpj: string;
  };

  type GetDetailResponse = {
    id: string;
    idProposta: string;
    codigoNeurotech: number;
    cnpj: string;
    razaoSocial: string;
    nomeFantasia: string;
    inscricaoEstadual: string;
    isenta: boolean;
    cnae: string;
    cnaesSecundarios: Array<string>;
    endereco: {
      logradouro: string;
      complemento: string;
      cep: string;
      bairro: string;
      numero: number;
      uf: string;
      cidade: string;
    };
    socios: Array<{
      nome: string;
      cpf: string;
    }>;
    status: string;
    statusCode: string;
    dataConsulta: string;
    erros: Array<{
      'Código do Erro': string;
      'Mensagem do Erro': string;
    }>;
  }

  type GetDetailDTO = {
    cnpj: string;
    cnae: string;
    secondaryCnaes: Array<string>;
    name: string;
    tradingName: string;
    status: string;
    partners: Array<{
      name: string;
      cpf: string;
    }>;
    address: {
      additionalInfo: string;
      city: string;
      neighborhood: string;
      number: string;
      street: string;
      uf: string;
      zipCode: string;
    }
  };
}
