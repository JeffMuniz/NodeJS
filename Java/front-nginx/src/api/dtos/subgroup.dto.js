import companyDTO from "./company.dto";

export default class Subgroup {
  constructor(data = {}) {
    this.id = data.id;
    this.name = data.name;
    this.companies = data.companies;
  }

  static fromApi(data = {}) {
    const object = {
      id: data.id,
      name: data.nome || data.nomeSubGrupo,
      companies:
        (data.empresas &&
          data.empresas.map(company => companyDTO.fromApi(company))) ||
        [],
    };

    return { ...object };
  }
}
