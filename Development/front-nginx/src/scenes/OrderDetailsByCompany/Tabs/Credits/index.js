import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Pagination, LoadingWrapper } from "@base";
import { FilterSearchableInput } from "@common";
import { getOrderCredits } from "@api/order/order";
import Table from "./Table";

export const FiltersWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 0 15px 30px 0;
`;

class CreditsTab extends Component {
  state = {
    credits: [],
    totalItems: 0,
    page: 1,
    loading: true,
    status: true,
    nome: "",
    cpf: "",
    matricula: "",
    messageError: "",
  };

  componentDidMount() {
    this.fetchData();
  }

  handleFilterStatus = ({ key: status }) =>
    this.setState({ status, page: 1 }, this.fetchData);

  handleFilterSearchableInput = ({ typedValue, key }) =>
    this.setState({ [key]: typedValue, page: 1 }, this.fetchData);

  changePage = ({ page }) => this.setState({ page }, this.fetchData);

  fetchData = ({ withLoading = true } = {}) => {
    withLoading && this.setState({ loading: true, messageError: "" });

    const { page, status, nome, cpf, matricula } = this.state;
    const { match } = this.props;

    getOrderCredits({
      chargeId: match.params.chargeId,
      page,
      status,
      nome,
      cpf,
      matricula,
      onError: messageError => this.setState({ loading: false, messageError }),
      onSuccess: ({ credits, totalElements, messageError }) => {
        this.setState({
          credits,
          totalItems: totalElements,
          loading: false,
          messageError,
        });
      },
    });
  };

  render() {
    const { credits, loading, page, totalItems, messageError } = this.state;

    return (
      <Fragment>
        {!messageError && (
          <FiltersWrapper>
            {/* <DropdownFilter
            id="generic_dropdown_filter"
            options={[
              { key: true, description: "Ativo" },
              { key: false, description: "Cancelado" },
            ]}
            callback={this.handleFilterStatus}
          /> */}

            <FilterSearchableInput
              onInputWithoutDebounce={() => this.setState({ loading: true })}
              dropdownFilterOptions={[
                { key: "nome", description: "Nome" },
                { key: "cpf", description: "CPF", mask: "cpf" },
                { key: "matricula", description: "Matrícula" },
              ]}
              onInput={this.handleFilterSearchableInput}
            />
          </FiltersWrapper>
        )}
        <LoadingWrapper
          hasError={!!messageError}
          messageError={messageError}
          loading={loading}
          paddingTop="20px"
        >
          <Pagination
            data={{ totalItems }}
            currentPage={page}
            itemsPerPage={10}
            callback={this.changePage}
            render={() => <Table items={credits} />}
          />
        </LoadingWrapper>
      </Fragment>
    );
  }
}

CreditsTab.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({ chargeId: PropTypes.string }),
  }),
};

CreditsTab.defaultProps = {
  match: {
    params: {},
  },
};

export default withRouter(CreditsTab);
