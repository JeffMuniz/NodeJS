import { CNPJ, CPF } from "cpf_cnpj";
import { formatDate, toString, toMoneyMask, toNumberMask } from "@utils";
import { productTypes } from "@enums";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import get from "lodash/get";

const PRODUCT_TYPES_IDS = Object.keys(productTypes);

const ID_mac_ALIMENTACAO = 1;
const ID_mac_REFEICAO = 2;
const ID_mac_FLEX = 4;

export const OrderDetails = (data = {}, idGrupo, idPedido) => ({
  orderId: toString(idPedido),
  branchId: toString(idGrupo),
  chargeId: toString(data.idCarga),
  creditDate: toString(data.dataAgendamento) || "",
  cnpj: toString(CNPJ.format(data.cnpj)),
  amount: toString(toMoneyMask(data.valorTotal)),
  status: data.statusCredito,
  employeesTotal: toNumberMask(data.qtdFuncionarios || 0),
  actions: data.podeCancelar || "",
  centralized: data.faturamentoCentralizado,
  costCenter: data.centroCusto,
});

export const OrderDetailsHeader = (data = {}, idGrupo) => {
  const produtos = get(data, "produtos", []);
  const produtoAlimentacao = produtos.find(
    produto => produto.idProduto === ID_mac_ALIMENTACAO,
  );
  const produtoRefeicao = produtos.find(
    produto => produto.idProduto === ID_mac_REFEICAO,
  );
  const produtoFlex = produtos.find(
    produto => produto.idProduto === ID_mac_FLEX,
  );

  const valorTotalAlimentacao = get(produtoAlimentacao, "valorTotal", 0);
  const valorTotalRefeicao = get(produtoRefeicao, "valorTotal", 0);
  const valorTotalFlex = get(produtoFlex, "valorTotal", 0);

  return {
    orderId: toString(data.idPedido),
    branchId: toString(idGrupo),
    creditDate: toString(data.dataCredito) || "",
    cnpj: toString(CNPJ.format(data.cnpj)),
    requirer: data.requisitante,
    status: data.statusCredito,
    employeesTotal: toNumberMask(data.qtdFuncionarios || 0),
    numberNewCards: toNumberMask(data.qtdCartoesNovos || 0),
    numberOfEmployees: toNumberMask(data.qtdFuncionarios || 0),
    numberOfEmployeesWithCredit: toNumberMask(
      data.qtdFuncionariosComCredito || 0,
    ),
    macAlimentacao: toMoneyMask(valorTotalAlimentacao),
    macRefeicao: toMoneyMask(valorTotalRefeicao),
    macnai: toMoneyMask(valorTotalFlex),
    amountmacefit: toMoneyMask(data.totalmaceficio || 0),
    amount: toMoneyMask(data.valorTotal || 0),
    discount: `- ${toMoneyMask(data.desconto || 0)}`,
    rebate: `- ${toMoneyMask(data.rebate || 0)}`,
    showRebate: !isNil(data.rebate),
    taxes: toMoneyMask(data.taxas || 0),
    hasTaxes: !!data.taxas,
    actions: data.podeCancelar,
    centralized: data.faturamentoCentralizado,
    canCreditAnticipation: data.podeAnteciparCredito,
    showCostCenter: !!data.exibeCentroCusto,
  };
};

export const Order = (data = {}, idGrupo) => ({
  id: toString(data.idPedido),
  branchId: toString(idGrupo),
  date: data.dataPedido ? toString(data.dataPedido) : "",
  amount: toString(data.valorTotal),
  amountmacefit: toString(data.totalmaceficio),
  status: data.statusPedido,
  paymentStatus: data.statusPagamento,
  rebate: data.rebate || "",
  requirer: data.requisitante,
  branchesOrders:
    data.listaProdutos && Array.isArray(data.listaProdutos)
      ? data.listaProdutos.map(voucher => ({
          id: toString(voucher.idProduto),
          name: toString(voucher.nomeProduto),
          employeesTotal: toString(voucher.totalPessoas),
          amount: toString(voucher.valorTotal),
          cnpj: data.cnpj,
        }))
      : [],
  canCancel: data.podeCancelar,
  employeesTotal: data.qtdFuncionarios || "",
  discount: toString(data.desconto),
  centralized: data.faturamentoCentralizado,
  canCreditAnticipation: data.podeAnteciparCredito,
  creditAnticipationTax: toMoneyMask(data.taxaAntecipacaoCredito || 0),
  showCreditAnticipationTax: !!data.taxaAntecipacaoCredito,
});

const sumTotalProductValue = ({ products, productId }) =>
  products
    .filter(item => toString(item.idProduto) === productId)
    .reduce(
      (acc, { valorTotal, valorCarga }) =>
        valorTotal ? acc + valorTotal : acc + valorCarga,
      0,
    );

const getProductValue = ({ products, productId }) => {
  const value = sumTotalProductValue({ products, productId });
  return value ? toMoneyMask(value) : "R$ 0,00";
};

const mountProductsDetails = ({ products }) => {
  let productDetails = {};

  Object.keys(productTypes).forEach(productId => {
    const productType = productTypes[productId];
    const totalProperty = `total${productType.abbreviation}`;
    let totalValue = "-";
    const issuanceProperty = `${productType.abbreviation}Issuance`;
    let issuanceValue = "-";

    const product = products.find(
      prod => toString(prod.idProduto) === productId,
    );

    if (!isEmpty(product)) {
      totalValue = getProductValue({ products, productId });
      issuanceValue =
        product.indicadorEmissaoCartao.toUpperCase() === "SIM" ? "Sim" : "-";
    }

    productDetails = {
      ...productDetails,
      [totalProperty]: totalValue,
      [issuanceProperty]: issuanceValue,
    };
  });

  return productDetails;
};

const mountAddress = ({ logradouro = "", bairro = "", uf = "" } = {}) =>
  [logradouro, bairro, uf].filter(op => !!op).join(" - ");

const DetailsByCompany = (data = {}) => ({
  employeeId: toString(data.idFuncionario),
  cpf: toString(CPF.format(data.cpf)),
  name: data.nome,
  ...mountProductsDetails({
    products: data.produtos,
  }),
  deliveryPlace: mountAddress(data) || "-",
});

export const orderDetailsByCompanyfromApi = (data = {}) => ({
  content: data.content.map(order => DetailsByCompany(order)),
  totalItems: data.totalElements,
});

export const orderDetailsfromApi = (data = {}, idGrupo, idPedido) => {
  const object = {
    content: data.cargas.map(order => OrderDetails(order, idGrupo, idPedido)),
    isProcessing: data.cargas.some(
      carga => carga.statusCredito === "CARGA_PROCESSANDO",
    ),
    totalItems: data.totalLinhas,
  };

  return { ...object };
};

export const orderDetailHeaderFromApi = (data = {}, idGrupo, idPedido) => {
  const object = {
    content: OrderDetailsHeader(data, idGrupo, idPedido),
  };

  return { ...object };
};

export const orderDetailfromApi = (data = {}) => {
  const produtos = get(data, "produtos", []);
  const produtoFlex = produtos.find(
    produto => produto.idProduto === ID_mac_FLEX,
  );

  const valorTotalFlex = get(produtoFlex, "valorTotal", 0);

  const object = {
    orderId: data.idPedido,
    cnpj: toString(CNPJ.format(data.cnpj)),
    employeesTotal: data.qtdFuncionarios || "",
    employeesCreditTotal: data.qtdFuncionariosComCredito || 0,
    newCardsTotal: data.qtdCartoesNovos || 0,
    orderStatus: data.statusPedido || "",
    creditStatus: data.statusCredito || "",
    paymentStatus: data.statusPagamento || "",
    totalVR: getProductValue({
      products: data.produtos,
      productId: PRODUCT_TYPES_IDS[1],
    }),
    totalVA: getProductValue({
      products: data.produtos,
      productId: PRODUCT_TYPES_IDS[0],
    }),
    macnai: toMoneyMask(valorTotalFlex),
    macefitAmount: toMoneyMask(data.totalmaceficios || 0),
    amount: toMoneyMask(data.valorTotal || 0),
    discount: `- ${toMoneyMask(data.desconto || 0)}`,
    rebate: `- ${toMoneyMask(data.rebate || 0)}`,
    showRebate: !isNil(data.rebate),
    taxes: toMoneyMask(data.taxas || 0),
    hasTaxes: !!data.taxas,
    reports: data.relatorios,
    orderDate: data.dataPedido,
    creditDate: data.dataAgendamento,
    companyName: data.razaoSocial,
    requirer: data.requisitante,
    centralized: data.faturamentoCentralizado,
    costCenter: data.centroCusto,
  };

  return { ...object };
};

export const orderDetailsToApi = (data = {}) => {
  const object = {
    idGrupoEmpresa: data.idGroup,
    idUsuario: data.idUser,
    page: data.page,
  };

  return { ...object };
};

export const orderFromApi = (data = {}, idGrupo) => {
  const result = Order(data, idGrupo);

  const object = {
    content: result || [],
    totalItems: data.totalElements,
  };

  return { ...object };
};

export const orderToApi = (data = {}) => {
  const object = {
    idArquivoCarga: data.orderId,
    idGrupoEmpresa: data.idGroup,
    idUsuarioSessao: data.idUser,
  };

  return { ...object };
};

export const orderToApiHeader = (data = {}) => {
  const object = {
    idArquivoCarga: data.orderId,
    idGrupoEmpresa: data.idGroup,
    idUsuario: data.idUser,
  };

  return { ...object };
};

export const orderToApiOrderConfirmation = (data = {}) => {
  const object = {
    idGrupoEmpresa: data.idGroup,
    idUsuario: data.idUser,
  };

  return { ...object };
};

const orderError = (data = {}) => {
  const object = {
    line: data.linha,
    error: data.erro,
  };
  return { ...object };
};

export const orderErrorsFromApi = (data = {}) => {
  const object = {
    content: data.content.map(error => orderError(error)),
    totalItems: data.totalElements,
  };

  return { ...object };
};

export const onlineCreditFromApi = (data = {}, cnpj = null) => {
  const canCreditAnticipation = get(data, "data.podeAnteciparCredito", false);
  const tooltipEnum = get(data, "data.tooltip");
  const request = get(data, "data.usuariosSolicitacaoCredito[0]", {});
  const userName = request.nomeUsuarioSolicitacao;
  const requestDate = formatDate(request.dataSolicitacao);

  const object = {
    canCreditAnticipation,
    tooltipEnum,
    anticipationFeedbackMessage: "Antecipar crédito",
    textAnticipationButton: "antecipar crédito",
  };

  switch (tooltipEnum) {
    case "TODOS_CREDITOS_DISPONIBILIZADOS":
      object.anticipationFeedbackMessage = "Créditos foram disponibilizados";
      break;
    case "PEDIDO_NAO_ELEGIVEL_ANTECIPACAO_NOVOS_CARTOES":
      object.anticipationFeedbackMessage =
        "Há emissão de cartão para todos os funcionários que estão neste pedido.";
      break;
    case "PEDIDO_NAO_ELEGIVEL_ANTECIPACAO_ZERADO":
      object.anticipationFeedbackMessage =
        "Não há créditos para os funcionários deste pedido.";
      break;
    case "PEDIDO_ANTECIPADO":
      object.anticipationFeedbackMessage = cnpj
        ? `CNPJ ${cnpj} do pedido antecipado no dia ${requestDate} por ${userName}`
        : `Pedido Antecipado no dia ${requestDate} por ${userName}`;

      object.textAnticipationButton = "pedido antecipado";
      break;
    default:
      break;
  }

  return object;
};
