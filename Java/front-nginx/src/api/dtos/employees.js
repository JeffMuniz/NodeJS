import { toString } from "@utils";
import { employeeStatus } from "@enums";

const mountAddress = ({
  logradouro = "",
  numero = "",
  bairro = "",
  cidade = "",
  uf = "",
}) => {
  const street = logradouro && `${logradouro},`;
  const number = numero && `${numero} -`;
  const neighboorhood = bairro && `${bairro} -`;
  const city = cidade && `${cidade}/`;

  return `${street} ${number} ${neighboorhood} ${city}${uf}`;
};

export default class EmployeesDto {
  constructor(data = {}) {
    this.cpf = data.cpf;
    this.number = data.number;
    this.name = data.name;
    this.birthday = data.birthday;
    this.address = data.address;
    this.status = data.status;
  }

  static fromApi(data = {}) {
    const object = {
      cpf: toString(data.pessoa.cpf),
      name: data.pessoa.nome,
      number: data.matricula,
      birthday: new Date(
        `${data.pessoa.dataNascimento}T03:00:00`,
      ).toLocaleDateString("en-GB"),
      address: mountAddress(data.endereco),
      status: employeeStatus[data.status],
    };

    return { ...object };
  }
}
