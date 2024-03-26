import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Pagination, LoadingWrapper } from "@base";
import { FilterSearchableInput } from "@common";
import { getOrderCards } from "@api/order/order";
import Table from "./Table";

export const FilterWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 0 15px 30px 0;
`;

class CardsTab extends Component {
  state = {
    cards: [],
    page: 1,
    totalItems: 0,
    loading: true,
    nome: "",
    cpf: "",
    matricula: "",
    messageError: "",
  };

  componentDidMount() {
    this.fetchData();
  }

  handleFilterSearchableInput = ({ typedValue, key }) =>
    this.setState({ [key]: typedValue, page: 1 }, this.fetchData);

  changePage = ({ page }) => this.setState({ page }, this.fetchData);

  fetchData = ({ withLoading = true } = {}) => {
    withLoading && this.setState({ loading: true, messageError: "" });

    const { page, status, nome, cpf, matricula } = this.state;
    const { match } = this.props;

    getOrderCards({
      chargeId: match.params.chargeId,
      page,
      status,
      nome,
      cpf,
      matricula,
      onError: messageError => this.setState({ loading: false, messageError }),
      onSuccess: ({ cards, totalElements, messageError }) => {
        this.setState({
          cards,
          totalItems: totalElements,
          loading: false,
          messageError,
        });
      },
    });
  };

  render() {
    const { cards, loading, totalItems, page, messageError } = this.state;

    return (
      <Fragment>
        {!messageError && (
          <FilterWrapper>
            <FilterSearchableInput
              onInputWithoutDebounce={() => this.setState({ loading: true })}
              dropdownFilterOptions={[
                { key: "nome", description: "Nome" },
                { key: "cpf", description: "CPF", mask: "cpf" },
                { key: "matricula", description: "Matrícula" },
              ]}
              onInput={this.handleFilterSearchableInput}
            />
          </FilterWrapper>
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
            render={() => <Table items={cards} />}
          />
        </LoadingWrapper>
      </Fragment>
    );
  }
}

CardsTab.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({ chargeId: PropTypes.string }),
  }),
};

CardsTab.defaultProps = {
  match: {
    params: {},
  },
};

export default withRouter(CardsTab);
