import React from "react";
import { func } from "prop-types";
import { connect } from "react-redux";
import moment from "moment";
import debounce from "lodash/debounce";

import { OpenModal } from "src/redux/modules/modal/actions/modal";
import reportActions from "src/redux/modules/reports/actions";
import { ContainerWrapper } from "@base";
import ReportsTable from "./Table/Table.container";
import CreateReportContainer from "../CreateReport/CreateReport.container";

export class ReportsContainer extends React.PureComponent {
  handleModalCreateReport = () => {
    const { openModal } = this.props;

    const delayedExecution = debounce(this.findAllReports, 5000);

    const findAllWithReprocessing = () => {
      this.findAllReports();
      delayedExecution();
    };

    openModal({
      children: (
        <CreateReportContainer onCreateReport={findAllWithReprocessing} />
      ),
    });
  };

  actionButtons = () => [
    {
      value: "Novo relatório",
      imgSrc: "add",
      imgWidth: 16,
      id: "report-button-new-report",
      type: "actionButton",
      handleClick: this.handleModalCreateReport,
    },
  ];

  findAllReports = (numberPage = 0) => {
    const { findAllReports } = this.props;

    const today = moment();

    return findAllReports({
      dataFim: today.format("YYYY-MM-DD"),
      dataInicio: today.subtract(90, "days").format("YYYY-MM-DD"),
      numberPage,
      sizePage: 10,
    });
  };

  render() {
    return (
      <ContainerWrapper
        title="Relatórios"
        isBiggerTitle
        actionButtons={this.actionButtons()}
      >
        <ReportsTable
          findAllReports={this.findAllReports}
          handleModalCreateReport={this.handleModalCreateReport}
        />
      </ContainerWrapper>
    );
  }
}

ReportsContainer.propTypes = {
  openModal: func.isRequired,
  findAllReports: func.isRequired,
};

const mapDispatchToProps = {
  findAllReports: reportActions.findAllReports,
  openModal: OpenModal,
};

export default connect(null, mapDispatchToProps)(ReportsContainer);
