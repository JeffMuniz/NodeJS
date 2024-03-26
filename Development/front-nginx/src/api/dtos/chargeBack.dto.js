import { toMoneyMask } from "@utils";

const RequestSplitDTO = (data = {}) => ({
  id_funcionario: data.id || 0,
  produtos: data.produtos.filter(el => el.valor_solicitado !== 0),
});

export const RequestToApi = (employees, company, requester) => {
  const object = {
    id_empresa: company.id || 0,
    motivo: employees.cpfs[0].reasonKey || "",
    funcionarios: employees.cpfs.map(el => RequestSplitDTO(el)),
    solicitante: requester,
  };

  return { ...object };
};

export const SearchtoApi = (idGroup, idCompany, idEmployee, cpfs) => {
  const object = {
    idUsuario: Number(idEmployee) || 0,
    idEmpresa: idCompany || 0,
    idGrupoEmpresa: idGroup || 0,
    cpfs: cpfs.map(el => el) || [],
  };
  return { ...object };
};

export const OrganizeEmployee = (data, values) => {
  const object =
    data &&
    data.map(el => ({
      id: el.idFuncionario,
      cpf: el.cpf,
      isValid: true,
      name: el.nome,
      reason: values.reason,
      reasonKey: values.reasonKey,
      va: toMoneyMask(values.vaDefaultValue) || null,
      vr: toMoneyMask(values.vrDefaultValue) || null,
      produtos: el && el.produtos.map(prod => prod),
    }));

  return object;
};

export const OrganizeCpf = data => {
  const object = data && data.map(el => el.cpf);
  return object;
};

export const FormatedProduct = data => {
  const object =
    data &&
    data.map(el => ({
      cpf: el.cpf,
      id: el.id,
      isValid: el.isValid,
      name: el.name,
      reason: el.reason,
      reasonKey: el.reasonKey,
      isInvalidFromApi: el.isInvalidFromApi || false,
      va: el.produtos.find(prodVa => prodVa === "VA") ? el.va : null,
      vr: el.produtos.find(prodVr => prodVr === "VR") ? el.vr : null,
    }));

  return object;
};
