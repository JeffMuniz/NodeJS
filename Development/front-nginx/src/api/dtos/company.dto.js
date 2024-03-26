export default class CompanyDto {
  constructor(data = {}) {
    this.id = data.id;
    this.name = data.name;
    this.cnpj = data.cnpj;
  }

  static fromApi(data = {}) {
    const object = {
      id: data.id,
      name: data.nome,
      cnpj: data.cnpj,
    };

    return { ...object };
  }
}
