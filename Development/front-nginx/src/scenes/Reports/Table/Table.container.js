import React, { PureComponent } from "react";
import { func, shape, string, arrayOf, bool, number } from "prop-types";
import { connect } from "react-redux";
import saveAs from "file-saver";
import { size } from "lodash";

import { WithPagination, LoadingWrapper } from "@base";
import { AlertMessage } from "@common";

import { showToast as showToastAction } from "src/common/Toast/redux/actions/toast";
import * as modalActions from "src/redux/modules/modal/actions/modal";
import reportActions from "src/redux/modules/reports/actions";

import EmptyStatement from "./EmptyState";
import TableContent from "./TableContent";

const FILE_TYPE =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

const FILE_NAME = "Relatorio_Detalhado_Pedido.xls";

export class Table extends PureComponent {
  state = {
    checkedItems: [],
    isAllReportsCheckSelected: false,
  };

  componentDidMount = () => {
    const { findAllReports } = this.props;
    findAllReports();
  };

  onClickToggleAllReportsCheckHandler = () => {
    const { checkedItems } = this.state;
    const { contentAllowedToCheck } = this.props;

    let localCheckedItems;
    let isAllReportsCheckSelected = true;

    if (checkedItems.length > 0) {
      localCheckedItems = [];
      isAllReportsCheckSelected = false;
    } else {
      localCheckedItems = contentAllowedToCheck.map(el => el.id);
    }

    this.setState({
      checkedItems: localCheckedItems,
      isAllReportsCheckSelected,
    });
  };

  onClickToggleReportCheckHandler = item => () => {
    if (!item.canDelete) {
      return null;
    }

    const { checkedItems } = this.state;
    const { contentAllowedToCheck } = this.props;

    const localCheckedItems = [...checkedItems];

    const index = localCheckedItems.indexOf(item.id);

    if (index >= 0) {
      localCheckedItems.splice(index, 1);
    } else {
      localCheckedItems.push(item.id);
    }

    let isAllReportsCheckSelected = false;

    if (localCheckedItems.length === contentAllowedToCheck.length) {
      isAllReportsCheckSelected = true;
    }

    this.setState({
      checkedItems: localCheckedItems,
      isAllReportsCheckSelected,
    });
  };

  onClickDownloadOneHandler = item => async () => {
    const { downloadOneReport, findAllReports } = this.props;

    try {
      const file = await downloadOneReport(item);

      const blobFile = new Blob([file], {
        type: FILE_TYPE,
      });

      saveAs(blobFile, FILE_NAME);

      findAllReports();
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  };

  onClickDeleteOneHandler = item => async () => {
    await this.handleDeleteAction([item]);
  };

  onClickDeleteSelectedReportsHandler = async () => {
    const { checkedItems } = this.state;
    await this.handleDeleteAction(checkedItems);
  };

  handleDeleteAction = async items => {
    const {
      findAllReports,
      content,
      currentPage,
      deleteSelectedReports,
      showToast,
    } = this.props;

    const itemsQuantity = items.length;

    const response = await this.modalDeleteWarning(itemsQuantity);

    if (response) {
      try {
        await deleteSelectedReports(items);

        showToast({
          id: "toast_report_deleted",
          label: "Relatório excluído com sucesso!",
        });

        let page = currentPage;

        if (content.length - itemsQuantity <= 0) {
          page = currentPage - 1;
        }

        this.setState({ checkedItems: [], isAllReportsCheckSelected: false });

        await findAllReports(page <= 0 ? 0 : page);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e);
      }
    }
  };

  modalDeleteWarning = quantity =>
    new Promise(resolve => {
      const { openModal, closeModal } = this.props;

      const resolveTrue = () => {
        closeModal();
        resolve(true);
      };

      const resolveFalse = () => {
        closeModal();
        resolve(false);
      };

      const messageEnding = quantity > 1 ? `os ${quantity} items` : "o item";

      openModal({
        children: (
          <AlertMessage
            iconName="information"
            title={`Você realmente deseja excluir ${messageEnding}?`}
            message="Esta ação não poderá ser desfeita."
            buttonText="Ok"
            width="620px"
            buttonAction={resolveTrue}
            cancelBtnText="Cancelar"
            cancelBtnAction={resolveFalse}
          />
        ),
      });
    });

  handleOnPageChange = async ({ page }) => {
    const { findAllReports } = this.props;

    this.setState(
      {
        checkedItems: [],
        isAllReportsCheckSelected: false,
      },
      () => findAllReports(page),
    );
  };

  emptyStateComponent = () => {
    const { handleModalCreateReport } = this.props;

    return <EmptyStatement onClickCreateReport={handleModalCreateReport} />;
  };

  render() {
    const {
      requestStatus,
      findAllReports,
      isCheckAllBtnHidden,
      totalItems,
      content,
      currentPage,
      handleModalCreateReport,
    } = this.props;

    const { checkedItems, isAllReportsCheckSelected } = this.state;

    const hasItemsSelected = checkedItems.length > 0;

    return (
      <LoadingWrapper loading={requestStatus === "loading"}>
        <WithPagination
          showLoading
          itemsPerPage={10}
          data={{ totalItems }}
          status={requestStatus}
          currentPage={currentPage + 1}
          key={currentPage}
          callback={this.handleOnPageChange}
          emptyStateComponent={this.emptyStateComponent}
          onClickCreateReport={handleModalCreateReport}
          onCreateReport={findAllReports}
          render={props => (
            <TableContent
              {...props}
              data={content}
              checkedItems={checkedItems}
              isAllReportsCheckSelected={isAllReportsCheckSelected}
              isCheckAllBtnHidden={isCheckAllBtnHidden}
              onClickToggleReportCheck={this.onClickToggleReportCheckHandler}
              onClickToggleAllReportsCheck={
                this.onClickToggleAllReportsCheckHandler
              }
              onClickDeleteSelectedReports={
                this.onClickDeleteSelectedReportsHandler
              }
              hasItemsSelected={hasItemsSelected}
              onClickDeleteOne={this.onClickDeleteOneHandler}
              onClickDownloadOne={this.onClickDownloadOneHandler}
            />
          )}
        />
      </LoadingWrapper>
    );
  }
}

const mapStateToProps = ({ reports: { requestStatus, data } }) => {
  const { totalItems, content, currentPage } = data;

  let contentAllowedToCheck = [];

  if (size(content)) {
    contentAllowedToCheck = content.filter(el => el.canDelete);
  }

  const isCheckAllBtnHidden = !size(contentAllowedToCheck);

  return {
    requestStatus,
    content,
    currentPage,
    totalItems,
    contentAllowedToCheck,
    isCheckAllBtnHidden,
  };
};

const mapDispatchToProps = {
  downloadOneReport: reportActions.downloadOneReport,
  deleteSelectedReports: reportActions.deleteSelectedReports,
  openModal: modalActions.OpenModal,
  closeModal: modalActions.CloseModal,
  showToast: showToastAction,
};

Table.propTypes = {
  findAllReports: func.isRequired,
  isCheckAllBtnHidden: bool.isRequired,
  downloadOneReport: func.isRequired,
  deleteSelectedReports: func.isRequired,
  openModal: func.isRequired,
  closeModal: func.isRequired,
  showToast: func.isRequired,
  totalItems: number,
  currentPage: number,
  content: arrayOf(shape({})),
  requestStatus: string.isRequired,
  contentAllowedToCheck: arrayOf(shape({})).isRequired,
  handleModalCreateReport: func.isRequired,
};

Table.defaultProps = {
  totalItems: 0,
  currentPage: 1,
  content: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
