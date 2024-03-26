import React, { Component } from "react";
import { connect } from "react-redux";
import { getReport } from "src/api/reports/report";
import { func, shape } from "prop-types";
import { showToast as showToastAction } from "src/common/Toast/redux/actions/toast";
import { downloadReportFile } from "src/utils/downloadFile";

import {
  DropdownExportContainer,
  SelectOptions,
  StyledOption,
  Title,
} from "./DropdownReports.styles";

class DropdownReports extends Component {
  handleExportFile = async fileType => {
    const {
      reports,
      handleChangeDropdownReportsVisibility,
      showToast,
    } = this.props;

    const reportSelected = reports.find(report => report.formato === fileType);
    const chave = reportSelected.chavePesquisa;

    handleChangeDropdownReportsVisibility();

    try {
      showToast({
        id: "information_toast_message",
        label: "Realizando o download do documento!",
      });

      const { data } = await getReport(chave);

      downloadReportFile({
        fileType,
        content: data.conteudo,
        fileName: data.nomeArquivo,
      });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);

      showToast({
        id: "error_toast_message",
        label:
          "Relatório em processamento. Aguarde alguns minutos e solicite novamente.",
      });
    }
  };

  render() {
    return (
      <DropdownExportContainer>
        <SelectOptions>
          <Title>Clique no relatório a ser exportado:</Title>
          <StyledOption onClick={() => this.handleExportFile("PDF")}>
            PDF
          </StyledOption>
          <StyledOption onClick={() => this.handleExportFile("XLS")}>
            Excel
          </StyledOption>
        </SelectOptions>
      </DropdownExportContainer>
    );
  }
}

DropdownReports.propTypes = {
  reports: shape({}),
  handleChangeDropdownReportsVisibility: func.isRequired,
  showToast: func,
};

DropdownReports.defaultProps = {
  reports: {},
  showToast: () => null,
};

const mapDispatchToProps = {
  showToast: showToastAction,
};

export default connect(null, mapDispatchToProps)(DropdownReports);
