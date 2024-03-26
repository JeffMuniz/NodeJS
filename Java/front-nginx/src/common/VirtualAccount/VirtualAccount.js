import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import { string, bool, shape, func, number } from "prop-types";
import { connect } from "react-redux";
import store from "src/redux/configureStore";
import { SvgIcon, Tooltip } from "@common";
// import { Loading } from "@base";
import { If, toMoneyMask } from "@utils";
import { revenuesTypes, requestStatus } from "@enums";
import {
  getVirtualAccountCompanyBalance,
  getVirtualAccountGroupBalance,
} from "src/redux/modules/chargeBack/action/virtualAccount";

import {
  WrapperBalance,
  RowTitle,
  Title,
  ValueTotal,
  RowExtract,
  ButtonExtract,
  Description,
  valueDefault,
} from "./VirtualAccount.styles";

const message = {
  Desc: `Este valor representa o saldo total de todas as suas empresas juntas.
  Mas cada uma poderá usar o valor que ela mesma gerou de crédito.`,
  Cent: "Este valor representa o saldo total de todas as suas empresas juntas.",
};

const getIdEmpresa = () => {
  const {
    selectedCompanyTree: {
      selectedCompany: { id: companyId },
    },
  } = store.getState();

  return { companyId };
};

class VirtualAccount extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isControllRequest: false,
    };
  }
  componentDidMount() {
    const {
      getVirtualAccountCompanyBalance: getGroupBalance,
      getVirtualAccountGroupBalance: getCompanyBalance,
    } = this.props;
    const { companyId } = getIdEmpresa();
    getGroupBalance(companyId);
    getCompanyBalance(companyId);
  }

  componentDidUpdate = prevProps => {
    const { isControllRequest } = this.state;
    const { companyId } = getIdEmpresa();
    const { getVirtualAccountCompanyBalance: getGroupBalance } = this.props;

    const whereAmI = window.location.href;
    if (whereAmI.includes("financeiro")) {
      if (prevProps.companyId === companyId) return;
      if (prevProps.companyId !== companyId) {
        getGroupBalance(companyId);
      }
    }

    if (companyId === undefined || isControllRequest) return;
    getGroupBalance(companyId);
    this.controllRequestRender();
  };

  getBalance = () => {
    const { companyBalance, groupBalance } = this.props;
    if (
      !companyBalance ||
      !groupBalance ||
      companyBalance.requestStatus === requestStatus.loading ||
      groupBalance.requestStatus === requestStatus.loading
    )
      // return <Loading loading />;
      return "Aguarde...";
    const whereAmI = window.location.href;
    if (whereAmI.includes("pedidos")) {
      return toMoneyMask(groupBalance.data.amount);
    }
    return toMoneyMask(companyBalance.data.amount);
  };

  controllRequestRender = () => {
    this.setState({ isControllRequest: true });
  };

  render() {
    const {
      title,
      redirectDisabled,
      companyParams: { revenues },
    } = this.props;
    return (
      <WrapperBalance id="balance-wrapper">
        <RowTitle>
          <Title id="value-account">{title}</Title>
          <Tooltip message="Os seus créditos serão usados automaticamente nos próximos pedidos.">
            <SvgIcon id="icon-info" name="info" size={16} />
          </Tooltip>
        </RowTitle>
        <ValueTotal id="value-all">{this.getBalance()}</ValueTotal>
        <If test={revenues !== revenuesTypes[0] || !redirectDisabled}>
          <RowExtract>
            <Description
              id="extract-message"
              color={this.getBalance() !== valueDefault}
            >
              {revenues === revenuesTypes[1] ? message.Cent : message.Desc}
            </Description>
            <If test={!redirectDisabled}>
              <Link
                id="extract-redirect"
                to={{
                  pathname: "/financeiro",
                  state: { route: "Conta Virtual" },
                }}
              >
                <ButtonExtract>Ir para extrato</ButtonExtract>
              </Link>
            </If>
          </RowExtract>
        </If>
      </WrapperBalance>
    );
  }
}

VirtualAccount.propTypes = {
  title: string.isRequired,
  redirectDisabled: bool,
  companyParams: shape({}).isRequired,
  getVirtualAccountCompanyBalance: func.isRequired,
  getVirtualAccountGroupBalance: func.isRequired,
  companyBalance: shape().isRequired,
  groupBalance: shape().isRequired,
  companyId: number,
};

VirtualAccount.defaultProps = {
  redirectDisabled: false,
  companyId: undefined,
};

const mapStateToProps = ({
  virtualAccount: { companyBalance, groupBalance },
  selectedCompanyTree: { selectedGroup },
}) => ({
  companyBalance,
  groupBalance,
  companyParams: selectedGroup.params,
});

const mapDispatchToProps = {
  getVirtualAccountCompanyBalance,
  getVirtualAccountGroupBalance,
};

export default connect(mapStateToProps, mapDispatchToProps)(VirtualAccount);
