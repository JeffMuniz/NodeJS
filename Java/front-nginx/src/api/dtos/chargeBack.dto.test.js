import { OrganizeCpf, RequestToApi } from "./chargeBack.dto";

describe("API DTO - ChargeBack", () => {
  it("should parse api result to object mapped ", () => {
    const data = [
      {
        cpf: "54485349535",
        id: 5969,
        isValid: true,
        name: "Anna Ferreira Ribeiro",
        produtos: ["VA", "VR"],
        reason: "Fraude",
        reasonKey: "FRAUDE",
        va: "R$ 0,00",
        vr: "R$ 1,20",
      },
    ];

    const result = ["54485349535"];

    const organize = OrganizeCpf(data);

    expect(organize).toEqual(result);
  });
  it("should parse api result to object mapped to Employees ", () => {
    const employess = {
      cpfs: [
        {
          cpf: "54485349535",
          id: 5969,
          isValid: true,
          name: "Anna Ferreira Ribeiro",
          produtos: ["VA", "VR"],
          reason: "Fraude",
          reasonKey: "FRAUDE",
          va: "R$ 0,00",
          vr: "R$ 1,20",
        },
      ],
    };
    const company = {
      cnpj: "22617988000175",
      id: 4133,
      name: "Teste",
    };
    const requester = {
      id_usuario: 4235,
      nome_usuario: "Teste",
    };

    const result = {
      funcionarios: [{ id_funcionario: 5969, produtos: ["VA", "VR"] }],
      id_empresa: 4133,
      motivo: "FRAUDE",
      solicitante: { id_usuario: 4235, nome_usuario: "Teste" },
    };

    const organize = RequestToApi(employess, company, requester);

    expect(organize).toEqual(result);
  });
});
