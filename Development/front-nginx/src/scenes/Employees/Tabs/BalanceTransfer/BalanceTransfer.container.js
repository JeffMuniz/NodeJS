import React, { Component } from "react";

import { connect } from "react-redux";
import { inputToMoney } from "@utils";
import { shape, string, func } from "prop-types";
import {
  setTransferConfig,
  getTransferConfig,
  getValuesTransfer,
} from "src/api/card/cardTransfer";

import { showToast as showToastAction } from "src/common/Toast/redux/actions/toast";
import FormWrapper from "src/modules/Form/Form";
import BalanceTransfer from "./BalanceTransfer";

export class BalanceTransferContainer extends Component {
  state = {
    hasBalanceTransfer: false,
    hasMealToFood: false,
    hasFoodToMeal: false,
    hasAcceptTerms: false,
    foodValue: null,
    mealValue: null,
    visibleTooltip: false,
    loading: false,
    disabledBalanceTransfer: false,
    tooltipBalanceTransfer: false,
  };

  async componentDidMount() {
    const {
      selectedCompany: { cnpj },
      user,
    } = this.props;

    const config = await getTransferConfig(cnpj, +user.id);
    const disabledBalance = this.configDisabledBalanceTransfer(config);
    this.getBalanceTransfer(cnpj, disabledBalance);
  }

  onChangeState = (label, value) => {
    if (label === "hasBalanceTransfer") {
      this.setValueHasBalanceTransfer(value);
      return;
    }

    if (label === "hasAcceptTerms") {
      this.setState({
        ...this.state,
        hasAcceptTerms: value,
      });

      return;
    }

    this.removeValue(label, value);
  };

  setValueHasBalanceTransfer = value => {
    const { disabledBalanceTransfer, tooltipBalanceTransfer } = this.state;

    if (!disabledBalanceTransfer) {
      this.setState({
        hasFoodToMeal: false,
        hasMealToFood: false,
        foodValue: "",
        mealValue: "",
        hasBalanceTransfer: value,
      });

      return;
    }

    this.setState({
      ...this.state,
      tooltipBalanceTransfer: !tooltipBalanceTransfer,
    });
  };

  getBalanceTransfer = async (cnpj, disabledBalance) => {
    const result = await getValuesTransfer(cnpj);

    if (disabledBalance) {
      this.setState({
        ...this.state,
        hasBalanceTransfer: false,
      });

      return;
    }

    this.setState({
      ...result,
      visibleTooltip: false,
      hasAcceptTerms: false,
      tooltipBalanceTransfer: disabledBalance,
    });
  };

  configDisabledBalanceTransfer = config => {
    const disabledBalance = !config.valeRefeicao || !config.valeAlimentacao;

    this.setState({
      ...this.state,
      disabledBalanceTransfer: disabledBalance,
    });

    return disabledBalance;
  };

  removeValue = (label, value) => {
    const { foodValue, mealValue } = this.state;

    const obj = {
      ...this.state,
      [label]: value,
      foodValue:
        label === "hasFoodToMeal" ? this.formatValue(value) : foodValue,
      mealValue:
        label === "hasMealToFood" ? this.formatValue(value) : mealValue,
    };

    this.setState({
      ...obj,
      hasBalanceTransfer:
        !obj.hasFoodToMeal && !obj.hasMealToFood
          ? false
          : obj.hasBalanceTransfer,
    });
  };

  formatValue = value => (value ? "0,00" : "");

  showTooltip = () => {
    const { visibleTooltip } = this.state;

    this.setState({
      ...this.state,
      visibleTooltip: !visibleTooltip,
    });
  };

  changeValue = (label, value) => {
    const newState = this.state;
    newState[label] = inputToMoney(value || 0).replace("R$", "");

    this.setState({ newState });
  };

  submit = async () => {
    this.setState({ loading: true });
    const { selectedCompany, user, showToast } = this.props;

    try {
      const balanceTransferObj = {
        ...this.state,
        cnpj: selectedCompany.cnpj,
        cpf: user.cpf,
      };

      await setTransferConfig(balanceTransferObj);

      this.setState({ loading: false });
      showToast({
        id: "success-balance-transfer-id",
        label: "Configuração realizada com sucesso!",
      });
    } catch (error) {
      this.setState({ loading: false });
      showToast({
        id: "error-balance-transfer-id",
        label: "Ocorreu um erro ao alterar Trasferência de saldo!",
      });
    }
  };

  render() {
    const {
      hasBalanceTransfer,
      hasFoodToMeal,
      hasMealToFood,
      hasAcceptTerms,
      tooltipBalanceTransfer,
      foodValue,
      mealValue,
      visibleTooltip,
      loading,
    } = this.state;

    return (
      <FormWrapper enableReinitialize>
        <BalanceTransfer
          hasBalanceTransfer={hasBalanceTransfer}
          hasFoodToMeal={hasFoodToMeal}
          hasMealToFood={hasMealToFood}
          hasAcceptTerms={hasAcceptTerms}
          tooltipBalanceTransfer={tooltipBalanceTransfer}
          foodValue={foodValue}
          mealValue={mealValue}
          visibleTooltip={visibleTooltip}
          loading={loading}
          showTooltip={() => this.showTooltip()}
          changeValue={(label, value) => this.changeValue(label, value)}
          onChangeTransfer={(label, value) => this.onChangeState(label, value)}
          onSubmit={() => this.submit()}
        />
      </FormWrapper>
    );
  }
}

export const mapStateToProps = ({ selectedCompanyTree, user }) => ({
  selectedCompany: selectedCompanyTree.selectedCompany,
  user: user.profile.data,
});

export const mapDispatchToProps = {
  showToast: showToastAction,
};

BalanceTransferContainer.propTypes = {
  selectedCompany: shape({
    cnpj: string,
  }),
  user: shape({
    cpf: string,
  }),
  showToast: func.isRequired,
};

BalanceTransferContainer.defaultProps = {
  selectedCompany: { cnpj: "" },
  user: { cpf: "" },
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BalanceTransferContainer);
