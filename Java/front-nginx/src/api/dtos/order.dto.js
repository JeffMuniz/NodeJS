import get from "lodash/get";
import isNil from "lodash/isNil";
import { toString, formatDate, toMoneyMask, toNumberMask } from "@utils";

export const Order = data => ({
  id: toString(data.idPedido),
  date: data.dataCriacao ? toString(data.dataCriacao) : "",
  amount: toString(data.valormaceficio),
  status: data.statusPedido,
  paymentStatus: data.statusPagamento,
  canCancel: data.podeCancelar,
  showErrorMessage: !!data.motivoErro,
});

export const OrderStatus = data => ({
  id: toString(data.id),
  date: data.dataImportacao ? toString(data.dataImportacao) : "",
  amount: toString(data.valor),
  status: data.statusEnum,
  paymentStatus: data.statusPagamentoEnum,
  canCancel: data.podeCancelar,
  showErrorMessage: !!data.motivoErro,
});

const ID_mac_ALIMENTACAO = 1;
const ID_mac_REFEICAO = 2;
const ID_mac_FLEX = 4;

export const resolveOrderDetail = (order = {}) => {
  const produtos = get(order, "produtos", []);
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
  const macAlimentacao = toMoneyMask(valorTotalAlimentacao);
  const macRefeicao = toMoneyMask(valorTotalRefeicao);
  const macnai = toMoneyMask(valorTotalFlex);

  return {
    id: order.idPedido,
    creditDate: formatDate(order.dataCredito),
    amount: toMoneyMask(order.valorTotal),
    amountmacefit: toMoneyMask(order.totalmaceficio),
    numberNewCards: toNumberMask(order.qtdCartoesNovos || 0),
    numberOfEmployees: toNumberMask(order.qtdFuncionarios || 0),
    numberOfEmployeesWithCredit: toNumberMask(
      order.qtdFuncionariosComCredito || 0,
    ),
    rebate: toMoneyMask(order.rebate || 0),
    showRebate: !isNil(order.rebate),
    discount: toMoneyMask(order.desconto || 0),
    taxes: toMoneyMask(order.taxas || 0),
    hasTaxes: !!order.taxas,
    macAlimentacao,
    macRefeicao,
    macnai,
    anticipationTax: toMoneyMask(order.taxaAntecipacao || 0),
  };
};

const findByReactiveState = orders =>
  orders.some(
    order =>
      order.status === "VALIDANDO_ARQUIVO" ||
      order.status === "PROCESSANDO" ||
      order.status === "AGUARDANDO_CONFIRMACAO",
  );

export const ordersFromApi = (data = {}) => {
  const { pedidos, meta } = data;

  const content = pedidos.map(order => Order(order));

  const object = {
    content,
    totalItems: meta.total || 0,
    enableReactiveState: findByReactiveState(content),
  };

  return { ...object };
};

export const ordersToApi = (data = {}) => {
  const object = {
    idUsuario: data.userId,
    idGrupoEmpresa: data.companyGroupId,
    idPedido: data.orderId,
    statusPedido: data.orderStatus,
    dataCriacaoInicial: data.initialDate,
    dataCriacaoFinal: data.finalDate,
    paginaAtual: data.page,
    tamanhoPagina: data.size || 10,
  };

  return { ...object };
};

export const orderNotificationFromApi = (data = {}) => ({
  isOrderFileBeingProcessed: data.existeArquivoDePedidoEmProcessamento,
});

export const orderStatusToApi = (data = {}) => {
  const object = {
    idGrupoEmpresa: data.idGroup,
    idUsuario: data.userId,
  };

  return { ...object };
};

export const tedIssueFromApi = (data = {}) => ({
  name: data.nome,
  cnpj: data.cnpj,
  bank: data.banco,
  branch: data.agencia,
  account: data.conta,
  orderNumber: data.numeroPedido,
});
