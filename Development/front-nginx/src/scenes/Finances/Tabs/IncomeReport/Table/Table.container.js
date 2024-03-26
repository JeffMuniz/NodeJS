import React, { PureComponent } from "react";
import { func, shape, string, arrayOf, number } from "prop-types";
import { connect } from "react-redux";
import { snakeCase } from "lodash";

import { WithPagination } from "@base";
import { If } from "@utils";

import incomeReportActions from "src/redux/modules/finances/actions/incomeReport";
import { showToast as showToastAction } from "src/common/Toast/redux/actions/toast";
import { getRHUrl } from "src/modules/UrlManager/UrlManager";

import { getPDFDocument } from "src/api/files/files";
import TableContent from "./TableContent";
import EmptyStatement from "../EmptyState";
import { UpperContentTitle, UpperContentWrapper } from "./TableContent.styles";
import Search from "./Search/Search";

const EMPTY_TEXT_NO_CONTENT =
  "Nenhum informe de rendimentos para essa empresa.\nCaso tenha dúvidas, por favor entre em contato com nosso atendimento.";

const EMPTY_TEXT_NO_CONTENT_SEARCHING =
  "Não encontramos nenhuma empresa com esse CNPJ.";

export class Table extends PureComponent {
  state = { isSearching: false };

  componentDidMount = () => {
    this.findAllReports();
  };

  onClickDownloadOneHandler = ({ key, name, year }) => async () => {
    const { showToast } = this.props;
    try {
      showToast({
        id: "toast_downloading_in_progress",
        label: "O download do documento foi iniciado",
      });

      const fileName = `${snakeCase(`Informe Rendimento ${name} ${year}`)}.pdf`;
      const url = `${getRHUrl()}/informes-rendimento/${key}/download`;
      await getPDFDocument({ url, fileName });
    } catch (e) {
      showToast({
        id: "toast_downloading_error",
        label: "Houve um problema ao realizar o download do documento",
      });
    }
  };

  onClickSearchHandler = value =>
    this.setState({ isSearching: true }, () => this.findAllReports(0, value));

  handleOnPageChange = async ({ page }) => {
    this.findAllReports(page);
  };

  findAllReports = (numberPage = 0, cnpj = null) => {
    const { findAllReports } = this.props;
    findAllReports({ year: 2019, sizePage: 10, numberPage, cnpj });
  };

  render() {
    const { requestStatus, totalItems, content } = this.props;
    const { isSearching } = this.state;

    const EmptyStateText = isSearching
      ? EMPTY_TEXT_NO_CONTENT_SEARCHING
      : EMPTY_TEXT_NO_CONTENT;

    return (
      <div>
        <If test={isSearching || (content && content.length)}>
          <UpperContentWrapper>
            <UpperContentTitle>
              Baixe o informe de rendimentos da sua empresa abaixo
            </UpperContentTitle>
            <Search callback={this.onClickSearchHandler} />
          </UpperContentWrapper>
        </If>

        <WithPagination
          showLoading
          itemsPerPage={10}
          data={{ totalItems }}
          key={isSearching}
          currentPage={1}
          callback={this.handleOnPageChange}
          status={requestStatus}
          emptyStateComponent={() => <EmptyStatement text={EmptyStateText} />}
          render={props => (
            <TableContent
              {...props}
              data={content}
              onClickDownloadOne={this.onClickDownloadOneHandler}
            />
          )}
        />
      </div>
    );
  }
}

const mapStateToProps = ({
  finances: {
    incomeReports: { data, requestStatus, error },
  },
}) => {
  const { content, currentPage, totalItems } = data;

  return {
    content,
    currentPage,
    totalItems,
    requestStatus,
    error,
  };
};

const mapDispatchToProps = {
  findAllReports: incomeReportActions.findAllReports,
  downloadOneReport: incomeReportActions.downloadOneReport,
  showToast: showToastAction,
};

Table.propTypes = {
  findAllReports: func.isRequired,
  downloadOneReport: func.isRequired,
  showToast: func.isRequired,
  totalItems: number.isRequired,
  currentPage: number.isRequired,
  content: arrayOf(shape({})).isRequired,
  requestStatus: string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
