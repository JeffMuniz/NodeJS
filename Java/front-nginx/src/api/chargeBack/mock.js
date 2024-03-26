export const getEstornoHeader = {
  data: [
    {
      id: 368777,
      solicitante: "Gabriela Teste",
      data_solicitacao: "20/03/2020 10:42",
      valor_solicitado: 2750.0,
      valor_estornado: 2750.0,
      motivo: "Erro Operacional",
      quantidade: 7,
      status: "Concluído",
      termo_aceite: 234567,
    },
    {
      id: 368778,
      solicitante: "Gabriela Barbosa",
      data_solicitacao: "21/03/2020 10:42",
      valor_solicitado: 1550.0,
      valor_estornado: 1550.0,
      motivo: "Óbito",
      quantidade: 4,
      status: "Concluído",
      termo_aceite: 234568,
    },
    {
      id: 368779,
      solicitante: "Gabriela Ribeiro",
      data_solicitacao: "22/03/2020 10:42",
      valor_solicitado: 1800.0,
      valor_estornado: "",
      motivo: "Demissão",
      quantidade: 4,
      status: "Processando",
      termo_aceite: 234569,
    },
    {
      id: 368780,
      solicitante: "Gabriela Barbosa Ribeiro",
      data_solicitacao: "01/04/2020 16:27",
      valor_solicitado: 1330.34,
      valor_estornado: "",
      motivo: "Fraude",
      quantidade: "03",
      status: "Processando",
      termo_aceite: 234570,
    },
  ],
};

export const getEstornoBody = {
  data: [
    {
      page: 0,
      limit: 10,
      id: 368777,
      content: [
        {
          id_funcionario: 1231,
          funcionario: "Barbara Hellen Antunes",
          cpf: "12345678900",
          estornos: [
            {
              produto: "VR",
              valor_solicitado: 300.0,
              valor_estornado: 300.0,
            },
            {
              produto: "VA",
              valor_solicitado: 100.0,
              valor_estornado: 100.0,
            },
          ],
        },
        {
          id_funcionario: 1232,
          funcionario: "Bruno de Souza",
          cpf: "81868143880",
          estornos: [
            {
              produto: "VR",
              valor_solicitado: 100.0,
              valor_estornado: 100.0,
            },
            {
              produto: "VA",
              valor_solicitado: 250.0,
              valor_estornado: 150.0,
            },
          ],
        },
        {
          id_funcionario: 1233,
          funcionario: "Carlos Magno da Silva Alves Silva",
          cpf: "12345678901",
          estornos: [
            {
              produto: "VR",
              valor_solicitado: 300.0,
              valor_estornado: 300.0,
            },
            {
              produto: "VA",
              valor_solicitado: 100.0,
              valor_estornado: 100.0,
            },
          ],
        },
        {
          id_funcionario: 1234,
          funcionario: "João Moreira Cravo",
          cpf: "13717315862",
          estornos: [
            {
              produto: "VR",
              valor_solicitado: 300.0,
              valor_estornado: 300.0,
            },
            {
              produto: "VA",
              valor_solicitado: 100.0,
              valor_estornado: 100.0,
            },
          ],
        },
        {
          id_funcionario: 1235,
          funcionario: "Lisa Silva da Costa",
          cpf: "79416608815",
          estornos: [
            {
              produto: "VR",
              valor_solicitado: 300.0,
              valor_estornado: 300.0,
            },
            {
              produto: "VA",
              valor_solicitado: 100.0,
              valor_estornado: 100.0,
            },
          ],
        },
        {
          id_funcionario: 1236,
          funcionario: "Marcos Soares Castro",
          cpf: "12345678902",
          estornos: [
            {
              produto: "VR",
              valor_solicitado: 300.0,
              valor_estornado: 300.0,
            },
            {
              produto: "VA",
              valor_solicitado: 100.0,
              valor_estornado: 100.0,
            },
          ],
        },
        {
          id_funcionario: 1237,
          funcionario: "Ivani Calegari",
          cpf: "420.23remoteShellVulner28-99",
          estornos: [
            {
              produto: "VR",
              valor_solicitado: 300.0,
              valor_estornado: 300.0,
            },
            {
              produto: "VA",
              valor_solicitado: 100.0,
              valor_estornado: 100.0,
            },
          ],
        },
      ],
    },
    {
      page: 0,
      limit: 10,
      id: 368778,
      content: [
        {
          id_funcionario: 1231,
          funcionario: "Barbara Hellen Antunes",
          cpf: "12345678900",
          estornos: [
            {
              produto: "VR",
              valor_solicitado: 300.0,
              valor_estornado: 300.0,
            },
            {
              produto: "VA",
              valor_solicitado: 100.0,
              valor_estornado: 100.0,
            },
          ],
        },
        {
          id_funcionario: 1232,
          funcionario: "Bruno de Souza",
          cpf: "81868143880",
          estornos: [
            {
              produto: "VR",
              valor_solicitado: 100.0,
              valor_estornado: 100.0,
            },
            {
              produto: "VA",
              valor_solicitado: 250.0,
              valor_estornado: 150.0,
            },
          ],
        },
        {
          id_funcionario: 1233,
          funcionario: "Carlos Magno da Silva Alves Silva",
          cpf: "12345678901",
          estornos: [
            {
              produto: "VR",
              valor_solicitado: 300.0,
              valor_estornado: 300.0,
            },
            {
              produto: "VA",
              valor_solicitado: 100.0,
              valor_estornado: 100.0,
            },
          ],
        },
        {
          id_funcionario: 1234,
          funcionario: "João Moreira Cravo",
          cpf: "13717315862",
          estornos: [
            {
              produto: "VR",
              valor_solicitado: 300.0,
              valor_estornado: 300.0,
            },
            {
              produto: "VA",
              valor_solicitado: 100.0,
              valor_estornado: 100.0,
            },
          ],
        },
      ],
    },
    {
      page: 0,
      limit: 10,
      id: 368779,
      content: [
        {
          id_funcionario: 1231,
          funcionario: "Ana Lúcia Pacheco",
          cpf: "37127840075",
          estornos: [
            {
              produto: "VR",
              valor_solicitado: 300.0,
              valor_estornado: "",
            },
            {
              produto: "VA",
              valor_solicitado: 100.0,
              valor_estornado: "",
            },
          ],
        },
        {
          id_funcionario: 1232,
          funcionario: "Cláudia Oliveira",
          cpf: "79430177060",
          estornos: [
            {
              produto: "VR",
              valor_solicitado: 450.0,
              valor_estornado: "",
            },
            {
              produto: "VA",
              valor_solicitado: 250.0,
              valor_estornado: "",
            },
          ],
        },
        {
          id_funcionario: 1233,
          funcionario: "Ivan Castelari",
          cpf: "42032332899",
          estornos: [
            {
              produto: "VR",
              valor_solicitado: 300.0,
              valor_estornado: "",
            },
            {
              produto: "VA",
              valor_solicitado: 100.0,
              valor_estornado: "",
            },
          ],
        },
        {
          id_funcionario: 1234,
          funcionario: "João Montes Claros",
          cpf: "13717315862",
          estornos: [
            {
              produto: "VR",
              valor_solicitado: 300.0,
              valor_estornado: "",
            },
            {
              produto: "VA",
              valor_solicitado: "",
              valor_estornado: "",
            },
          ],
        },
      ],
    },
    {
      page: 0,
      limit: 10,
      id: 368780,
      content: [
        {
          id_funcionario: 1231,
          funcionario: "Ana Lúcia Pacheco",
          cpf: "37127840075",
          estornos: [
            {
              produto: "VR",
              valor_solicitado: 250.0,
              valor_estornado: "",
            },
            {
              produto: "VA",
              valor_solicitado: 250.0,
              valor_estornado: "",
            },
          ],
        },
        {
          id_funcionario: 1232,
          funcionario: "Cláudia Gomes Silva",
          cpf: "79430177061",
          estornos: [
            {
              produto: "VR",
              valor_solicitado: 250.0,
              valor_estornado: "",
            },
            {
              produto: "VA",
              valor_solicitado: 250.0,
              valor_estornado: "",
            },
          ],
        },
        {
          id_funcionario: 1233,
          funcionario: "Ivan Castelari Santos",
          cpf: "42032332899",
          estornos: [
            {
              produto: "VR",
              valor_solicitado: 200.0,
              valor_estornado: "",
            },
            {
              produto: "VA",
              valor_solicitado: 130.34,
              valor_estornado: "",
            },
          ],
        },
      ],
    },
  ],
};
