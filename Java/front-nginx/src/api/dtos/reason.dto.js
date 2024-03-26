import { toString } from "@utils";

export default class ReasonDto {
  constructor(data, key) {
    this.id = key;
    this.name = data.descricao;
  }

  static fromApi(data, key) {
    if (!data) return null;

    const object = {
      id: Number(key),
      name: toString(data.descricao) || "",
      label: toString(data.descricao) || "",
      value: toString(data.descricao) || "",
      key: data.chave || "",
      description: toString(data.descricao) || "",
    };

    return { ...object };
  }
}
