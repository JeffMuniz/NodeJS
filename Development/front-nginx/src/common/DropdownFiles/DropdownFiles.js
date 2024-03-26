import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import ReactTooltip from "react-tooltip";
import { func, string, shape, number, bool } from "prop-types";

import { IconInfoQuestionMark } from "@assets";
import { SvgIcon } from "@common";
import { dropdownFileFinances } from "@enums";
import { If } from "@utils";

import { getDocument } from "src/api/invoice/invoice";
import { getDocumentUnified } from "src/api/invoiceUnified";

import { showToast as showToastAction } from "src/common/Toast/redux/actions/toast";

import {
  DropdownExportContainer,
  SelectOptions,
  StyledOption,
  Title,
  DocumentTypeDescription,
  QuestionMarkIcon,
} from "./DropdownFiles.styles";

class DropdownFiles extends Component {
  constructor(props) {
    super(props);

    this.state = {
      exportOptions: dropdownFileFinances,
    };
  }

  componentDidMount() {
    this.handleExportOptionsFile();
  }

  getErrorLabelMsg = err => {
    if (
      {}.hasOwnProperty.call(err, "data") &&
      {}.hasOwnProperty.call(err.data, "mensagem")
    ) {
      return `${err.data.mensagem} ${err.data.erros[0].mensagem}`;
    }
    return "Ocorreu um erro ao obter documento!";
  };

  handleExportOptionsFile = () => {
    const {
      invoice: { allowRpsDownload, invoiceStatus, invoiceDate, paymentType },
      selectedGroup: {
        params: { isUnifiedInvoice },
      },
    } = this.props;

    let optionsDownloadFile = dropdownFileFinances;

    if (allowRpsDownload) {
      const allowInvoiceDownload = invoiceStatus === "GERADA";

      if (!allowInvoiceDownload) {
        optionsDownloadFile = optionsDownloadFile.map(e => {
          if (e.key === "NOTA_FISCAL") {
            return {
              ...e,
              enabled: false,
              message:
                invoiceStatus === "PENDENTE" && !isUnifiedInvoice
                  ? `Documento disponível a partir de ${invoiceDate}`
                  : "Documento em geração",
            };
          }

          return e;
        });
      }
    } else {
      optionsDownloadFile = optionsDownloadFile.map(e => {
        if (e.key === "RPS" || e.key === "NOTA_FISCAL") {
          return {
            ...e,
            enabled: false,
            message: "Emissão de documento zerado",
          };
        }

        return e;
      });
    }

    if (!paymentType || paymentType.toUpperCase() !== "BOLETO") {
      optionsDownloadFile = optionsDownloadFile.filter(e => e.key !== "BOLETO");
    }

    this.setState({
      exportOptions: optionsDownloadFile,
    });
  };

  handleExportFile = async documentOption => {
    if (!documentOption.enabled) {
      return null;
    }

    const {
      userData: { id: userId },
      selectedGroup: {
        id: groupId,
        params: { isUnifiedInvoice },
      },
      invoice,
      handleChangeDropdownVisibility,
      showToast,
    } = this.props;

    const { receivableId, invoiceId } = invoice;
    let response;

    try {
      showToast({
        id: "information_toast_message",
        label: "Obtendo documento!",
      });

      if (isUnifiedInvoice) {
        response = await getDocumentUnified({
          invoiceId,
          selectedExportOption: documentOption.key,
        });
      } else {
        response = await getDocument({
          receivableId,
          selectedExportOption: documentOption.key,
          userId,
          groupId,
        });
      }
    } catch (err) {
      const toastLabelMsg = this.getErrorLabelMsg(err);

      showToast({
        id: "error_toast_message",
        label: toastLabelMsg,
      });
    }

    try {
      if (
        typeof response !== "undefined" &&
        {}.hasOwnProperty.call(response, "data")
      ) {
        this.openDocumentInNewTab(documentOption.key, response.data);
      }
    } catch (err) {
      showToast({
        id: "error_toast_message",
        label:
          "Não foi possível abrir o documento! Verifique seu navegador. Pop-ups bloqueados!",
      });
    }
    if (handleChangeDropdownVisibility)
      return handleChangeDropdownVisibility(invoice);
  };

  openDocumentInNewTab = (selectedExportOption, response) => {
    if (selectedExportOption === "NOTA_FISCAL") {
      const { contentBody } = response;
      const file = window.open();
      file.location.href = contentBody;
    } else {
      const { contentTitle, contentType, contentBody } = response;

      const blob = this.b64toBlob(contentBody, contentType);
      const blobUrl = URL.createObjectURL(blob);

      const file = window.open();
      file.document.title = contentTitle;
      file.location.href = blobUrl;
    }
  };

  b64toBlob = (b64Data, contentType = "", sliceSize = 512) => {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i += 1) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  };

  render() {
    const { exportOptions } = this.state;

    return (
      <DropdownExportContainer>
        <SelectOptions>
          <Title>Clique nos documentos abaixo</Title>
          {exportOptions.map((option, index) => (
            <Fragment key={index}>
              <StyledOption
                key={option.key}
                id={`custom-select-option-${option.key}`}
                onClick={() => this.handleExportFile(option)}
                enabled={option.enabled}
              >
                <DocumentTypeDescription>
                  {option.description}
                </DocumentTypeDescription>
                <If test={!option.enabled && option.message}>
                  <QuestionMarkIcon data-tip data-for={`tooltip_file_${index}`}>
                    <SvgIcon icon={IconInfoQuestionMark} />
                    <ReactTooltip
                      id={`tooltip_file_${index}`}
                      place="top"
                      effect="solid"
                    >
                      <span>{option.message}</span>
                    </ReactTooltip>
                  </QuestionMarkIcon>
                </If>
              </StyledOption>
            </Fragment>
          ))}
        </SelectOptions>
      </DropdownExportContainer>
    );
  }
}

DropdownFiles.propTypes = {
  selectedGroup: shape({
    id: number,
    name: string,
    params: shape({
      isUnifiedInvoice: bool,
    }),
  }),
  userData: shape({
    id: string,
  }),
  invoice: shape({}),
  handleChangeDropdownVisibility: func.isRequired,
  showToast: func,
};

DropdownFiles.defaultProps = {
  selectedGroup: {},
  userData: {},
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

export default connect(mapStateToProps, mapDispatchToProps)(DropdownFiles);
