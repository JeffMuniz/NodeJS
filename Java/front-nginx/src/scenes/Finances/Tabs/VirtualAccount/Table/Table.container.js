import React, { PureComponent } from "react";
import { func, shape, string, arrayOf, number } from "prop-types";
import { connect } from "react-redux";

import { WithPagination } from "@base";

import { getVirtualAccountStatement as getStatement } from "src/redux/modules/chargeBack/action/virtualAccount";

import TableContent from "./TableContent";
import EmptyStatement from "../EmptyState";

const EMPTY_TEXT_NO_CONTENT =
  "Você ainda não tem nenhuma movimentação de créditos.\nAs movimentações de uso do crédito irão aparecer aqui.";

export class Table extends PureComponent {
  state = { isSearching: false };

  componentDidMount = () => {
    this.getVirtualAccountStatement();
  };

  componentDidUpdate = prevProps => {
    const { companyId } = this.props;

    if (prevProps.companyId === companyId) return;

    this.getVirtualAccountStatement();
  };

  getVirtualAccountStatement = (numberPage = 0) => {
    const { getVirtualAccountStatement } = this.props;

    getVirtualAccountStatement({ sizePage: 10, numberPage });
  };

  handleOnPageChange = async ({ page }) => {
    this.getVirtualAccountStatement(page);
  };

  render() {
    const { requestStatus, totalItems, content } = this.props;
    const { isSearching } = this.state;

    return (
      <WithPagination
        showLoading
        itemsPerPage={10}
        data={{ totalItems }}
        key={isSearching}
        currentPage={1}
        callback={this.handleOnPageChange}
        status={requestStatus}
        emptyStateComponent={() => (
          <EmptyStatement text={EMPTY_TEXT_NO_CONTENT} />
        )}
        render={props => <TableContent {...props} data={content} />}
      />
    );
  }
}

const mapStateToProps = ({
  virtualAccount: {
    statement: { data, requestStatus, error },
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
  getVirtualAccountStatement: getStatement,
};

Table.propTypes = {
  getVirtualAccountStatement: func.isRequired,
  totalItems: number.isRequired,
  currentPage: number.isRequired,
  content: arrayOf(shape({})).isRequired,
  requestStatus: string.isRequired,
  companyId: number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
