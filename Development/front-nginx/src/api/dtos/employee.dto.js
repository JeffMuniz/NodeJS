import { toString, toOnlyNumbers } from "@utils";

export default class EmployeeDto {
  constructor(data = {}) {
    this.id = data.id;
    this.idCompany = data.idCompany;
    this.cpf = data.cpf;
    this.cnpj = data.cnpj;
    this.accounts = data.accounts;
    this.name = data.name;
    this.status = data.status;
  }

  static fromApi(data) {
    if (!data) return null;

    const employeeStatus = {
      1: "ativo",
      2: "inativo",
    };

    const object = {
      id: data.id || "",
      idPerson: (data.pessoa && toString(data.pessoa.idPessoa)) || "",
      name: (data.pessoa && data.pessoa.nome) || "",
      idCompany: toString(data.idEmpresa),
      registry: data.matricula || "",
      cpf: (data.pessoa && data.pessoa.cpf) || "",
      cnpj: data.cnpj || "",
      accounts:
        (data.funcionariosProdutos &&
          data.funcionariosProdutos.map(item => ({
            idAccount: item.conta && toString(item.conta.id),
            productId: item.conta && toString(item.conta.idProduto),
          }))) ||
        [],
      status: employeeStatus[data.status],
      birthDate: data.pessoa.dataNascimento || undefined,
      address: {
        neighborhood: data.endereco.bairro || "",
        zipcode: data.endereco.cep || "",
        city: data.endereco.cidade || "",
        complement: data.endereco.complemento || "",
        street: data.endereco.logradouro || "",
        number: data.endereco.numero || "",
        state: data.endereco.uf || "",
      },
    };

    return { ...object };
  }
}

export const toApi = (data = {}) => ({
  id: data.id,
  nome: data.name,
  matricula: data.registry,
  dataNascimento: data.birthDate,
  endereco: {
    logradouro: data.address.street,
    numero: data.address.number,
    complemento: data.address.complement,
    bairro: data.address.neighborhood,
    cidade: data.address.city,
    uf: data.address.state,
    cep: toOnlyNumbers(data.address.zipcode),
  },
  identificacao: {
    idUsuario: data.userId,
    idGrupoEmpresa: data.groupId,
  },
});

export const toStatusApi = (data = {}, reason) => ({
  idFuncionario: data.id,
  motivo: reason,
});

export const OrganizeEmployee = (data, values) => {
  const employeeStatus = {
    1: true, // ativo
    2: false, // inativo
  };

  const object =
    data &&
    data.map(el => ({
      id: el.idFuncionario,
      cpf: el.cpf,
      isValid: true,
      name: el.nome,
      reason: values.reason,
      reasonKey: values.reasonKey,
      reasonDescription: values.reasonDescription,
      status: employeeStatus[el.status],
    }));

  return object;
};

export const FormattedEmployees = data => {
  const object =
    data &&
    data.map(el => ({
      cpf: el.cpf,
      id: el.id,
      isValid: el.isValid,
      isInvalidFromApi: el.isInvalidFromApi || false,
      isInvalidStatus: el.isInvalidStatus || false,
      name: el.name,
      reason: el.reason,
      reasonKey: el.reasonKey,
      reasonDescription: el.reasonDescription,
      status: el.status,
    }));

  return object;
};
