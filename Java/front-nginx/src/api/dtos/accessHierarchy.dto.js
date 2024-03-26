import DateManager from "src/modules/DateManager/DateManager";
import { toString } from "@utils";
import { dateHourFormats } from "@enums";

import GroupDTO from "./group.dto";
import SubgroupDTO from "./subgroup.dto";
import CompanyDTO from "./company.dto";

const CompanyAccess = ({ idEmpresa: id, nomeEmpresa: nome, cnpj } = {}) => ({
  ...CompanyDTO.fromApi({ id, nome, cnpj }),
});

const SubgroupAccess = ({
  idSubgrupo: id,
  nomeDescricao: nome,
  empresas,
} = {}) => ({
  ...SubgroupDTO.fromApi({ id, nome }),
  companies: empresas && empresas.map(company => CompanyAccess(company)),
});

const GroupAccess = ({
  nomeGrupoEmpresa: nome,
  idGrupoEmpresa: idGrupo,
  subgrupos,
} = {}) => ({
  ...GroupDTO.fromApi({ nome, idGrupo }),
  subgroups: subgrupos && subgrupos.map(subgroup => SubgroupAccess(subgroup)),
});

export default class AccessHierarchy {
  constructor(data = {}) {
    this.id = data.id;
    this.name = data.name;
    this.email = data.email;
    this.cpf = data.cpf;
    this.permission = data.permission;
  }

  static fromApi(data = {}) {
    const { ddd, telefone } = data;

    const dddValue = ddd;
    const phoneNumber = telefone;

    let phone = null;

    if (dddValue && phoneNumber) {
      phone = dddValue + phoneNumber;
    }

    const object = {
      id: toString(data.idUsuario),
      name: data.nome,
      email: data.email,
      cpf: data.cpf,
      birthDate: data.dataNascimento
        ? DateManager.utc(data.dataNascimento).format(
            dateHourFormats.longDateSlash,
          )
        : "",
      phone,
      mother: data.nomeMae,
      permission:
        data.permissao && data.permissao.grupo
          ? {
              group: {
                ...GroupAccess(data.permissao.grupo),
              },
            }
          : undefined,
    };

    return { ...object };
  }
}
