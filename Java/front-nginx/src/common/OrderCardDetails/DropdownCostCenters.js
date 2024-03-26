import React, { Component } from "react";
import { connect } from "react-redux";
import ReactTooltip from "react-tooltip";
import { func, shape, string } from "prop-types";
import get from "lodash/get";
import { getCostCentersFromOrder } from "@api/order/order";
import { getDocument } from "src/api/invoice/invoice";
import { buttonTypes } from "@enums";
import { SvgIcon } from "@common";
import { IconInfoQuestionMark } from "@assets";
import { convertBase64toBlob } from "@utils";
import { showToast as showToastAction } from "src/common/Toast/redux/actions/toast";
import {
  Box,
  Span,
  SpanBold,
  NotFound,
  CostCenterList,
  CostCenterItem,
  InputLabel,
  InputRadio,
  SearchBar,
  ContinueButton,
  BackButton,
  CostCenterInfo,
  DocumentList,
  DocumentItem,
  QuestionMarkIcon,
} from "./DropdownCostCenter.styles";

class DropdownCostCenters extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchInput: "",
      costCenters: [],
      filteredCostCenters: [],
      selectedCostCenter: {},
      showDocuments: false,
      loading: true,
    };
  }

  componentDidMount = () => {
    this.loadCostCenters();
  };

  getErrorLabelMsg = error => {
    const message = get(error, "data.mensagem");
    const detail = get(error, "data.erros[0].mensagem");

    return message
      ? `${message} ${detail}`
      : "Ocorreu um erro ao obter documento!";
  };

  getDetailLinkNotaFiscal = () => {
    const { invoice } = this.props;
    const { allowRpsDownload, invoiceStatus, invoiceDate } = invoice;

    if (allowRpsDownload && invoiceStatus !== "GERADA") {
      return {
        enabled: false,
        description:
          invoiceStatus === "PENDENTE"
            ? `Documento disponível a partir de ${invoiceDate}`
            : "Documento em geração",
      };
    } else if (!allowRpsDownload) {
      return {
        enabled: false,
        description: "Emissão de documento zerado",
      };
    }

    return {
      enabled: true,
      description: "",
    };
  };

  getDetailLinkRps = () => {
    const { invoice } = this.props;
    const { allowRpsDownload } = invoice;

    if (!allowRpsDownload) {
      return {
        enabled: false,
        description: "Emissão de documento zerado",
      };
    }

    return {
      enabled: true,
      description: "",
    };
  };

  handleSearchInput = ({ target }) => {
    const { costCenters } = this.state;

    this.setState({
      searchInput: target.value,
      filteredCostCenters: costCenters.filter(cc =>
        cc.centroCusto.toUpperCase().includes(target.value.toUpperCase()),
      ),
    });
  };

  loadCostCenters = async () => {
    const { orderId } = this.props;
    const costCenters = await getCostCentersFromOrder(orderId);

    this.setState({ costCenters, filteredCostCenters: costCenters });
    this.setState({ loading: false });
  };

  handleSelectedInputRadio = selectedCostCenter =>
    this.setState({ selectedCostCenter });

  handleExportFile = async documentType => {
    const { showToast } = this.props;
    const { selectedCostCenter } = this.state;

    let responseDocument;

    try {
      showToast({
        id: "information_toast_message",
        label: "Obtendo documento!",
      });

      const response = await getDocument({
        receivableId: selectedCostCenter.idRecebivel,
        selectedExportOption: documentType,
      });

      responseDocument = get(response, "data");
    } catch (error) {
      showToast({
        id: "error_toast_message",
        label: this.getErrorLabelMsg(error),
      });
    }

    if (responseDocument) {
      try {
        this.openDocumentInNewTab(responseDocument);
      } catch (err) {
        showToast({
          id: "error_toast_message",
          label:
            "Não foi possível abrir o documento! Verifique seu navegador. Pop-ups bloqueados!",
        });
      }
    }
  };

  openDocumentInNewTab = response => {
    const file = window.open();
    const { contentTitle, contentType, contentBody } = response;

    const blob = convertBase64toBlob(contentBody, contentType);
    const blobUrl = URL.createObjectURL(blob);

    file.document.title = contentTitle;
    file.location.href = blobUrl;
  };

  render() {
    const {
      searchInput,
      filteredCostCenters,
      selectedCostCenter,
      showDocuments,
      loading,
    } = this.state;

    const { invoice } = this.props;

    const noCostCenter = filteredCostCenters <= 0;

    return (
      <Box>
        {!showDocuments ? (
          <div>
            <Span>Selecione o centro de custo</Span>
            <SearchBar
              type="text"
              value={searchInput}
              onChange={this.handleSearchInput}
              placeholder="Digite o Centro de Custo"
            />
            <CostCenterList>
              {noCostCenter && !loading && (
                <NotFound>Nenhum centro de custo encontrado</NotFound>
              )}

              {loading && <NotFound>Obtendo centros de custo...</NotFound>}

              {filteredCostCenters ? (
                filteredCostCenters.map((centroCusto, index) => (
                  <CostCenterItem key={index}>
                    <InputLabel htmlFor={centroCusto.centroCusto}>
                      <InputRadio
                        type="radio"
                        id={centroCusto.centroCusto}
                        value={centroCusto.centroCusto}
                        checked={
                          centroCusto.centroCusto ===
                          selectedCostCenter.centroCusto
                        }
                        onChange={() =>
                          this.handleSelectedInputRadio(centroCusto)
                        }
                      />
                      {centroCusto.centroCusto}
                    </InputLabel>
                  </CostCenterItem>
                ))
              ) : (
                <NotFound>
                  Não foi possível obter os centros de custo deste pedido
                </NotFound>
              )}
            </CostCenterList>
            <ContinueButton
              disabled={!selectedCostCenter.centroCusto}
              onClick={() => this.setState({ showDocuments: true })}
              buttonType={buttonTypes.primary}
              value="Continuar"
            />
          </div>
        ) : (
          <div>
            <BackButton onClick={() => this.setState({ showDocuments: false })}>
              Voltar
            </BackButton>

            <CostCenterInfo>
              <Span>Centro de custo selecionado:</Span>
              <SpanBold>{selectedCostCenter.centroCusto}</SpanBold>
            </CostCenterInfo>

            <SpanBold>Agora, clique nos documentos abaixo</SpanBold>
            <DocumentList>
              <DocumentItem
                onClick={() => this.handleExportFile("NOTA_DEBITO")}
                id="nota-debito"
                enabled
              >
                Nota de débito
              </DocumentItem>

              <DocumentItem
                onClick={() => this.handleExportFile("NOTA_FISCAL")}
                id="nota-fiscal"
                enabled={this.getDetailLinkNotaFiscal().enabled}
              >
                <span>Nota fiscal</span>

                {!this.getDetailLinkNotaFiscal().enabled && (
                  <QuestionMarkIcon
                    data-tip
                    data-for="tooltip-file-nota-fiscal"
                  >
                    <SvgIcon icon={IconInfoQuestionMark} />
                    <ReactTooltip
                      id="tooltip-file-nota-fiscal"
                      place="top"
                      effect="solid"
                    >
                      <span>{this.getDetailLinkNotaFiscal().description}</span>
                    </ReactTooltip>
                  </QuestionMarkIcon>
                )}
              </DocumentItem>

              {invoice.paymentType === "BOLETO" && (
                <DocumentItem
                  onClick={() => this.handleExportFile("BOLETO")}
                  id="boleto"
                  enabled
                >
                  Boleto
                </DocumentItem>
              )}

              <DocumentItem
                onClick={() => this.handleExportFile("RPS")}
                id="rps"
                enabled={this.getDetailLinkRps().enabled}
              >
                <span>RPS</span>
                {!this.getDetailLinkRps().enabled && (
                  <QuestionMarkIcon data-tip data-for="tooltip-file-rps">
                    <SvgIcon icon={IconInfoQuestionMark} />
                    <ReactTooltip
                      id="tooltip-file-rps"
                      place="top"
                      effect="solid"
                    >
                      <span>{this.getDetailLinkRps().description}</span>
                    </ReactTooltip>
                  </QuestionMarkIcon>
                )}
              </DocumentItem>
            </DocumentList>
          </div>
        )}
      </Box>
    );
  }
}

DropdownCostCenters.propTypes = {
  invoice: shape({}),
  showToast: func,
  orderId: string.isRequired,
};

DropdownCostCenters.defaultProps = {
  invoice: {},
  showToast: () => null,
};

const mapDispatchToProps = {
  showToast: showToastAction,
};

const mapStateToProps = ({
  selectedCompanyTree: { selectedGroup },
  user: {
    profile: { data: userData },
  },
}) => ({
  userData,
  selectedGroup,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DropdownCostCenters);
