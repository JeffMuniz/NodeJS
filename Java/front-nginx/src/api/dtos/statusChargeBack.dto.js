export default class statusChargeBackDto {
  constructor(status) {
    this.key = status.chave;
    this.description = status.descricao;
  }

  static fromApi(status) {
    if (!status) return null;

    const object = {
      key: status.chave,
      description: status.descricao || "",
    };

    return { ...object };
  }
}
