import React, { PureComponent, Fragment } from "react";
import { arrayOf, func, shape, string } from "prop-types";
import { orderBy } from "lodash";
import { connect } from "react-redux";
import { CPF } from "cpf_cnpj";

import { Loading } from "@base";
import { activeReason, inactiveReason } from "@enums";
import { If } from "@utils";

import FormWrapper from "src/modules/Form/Form";
import * as employeeActions from "src/redux/modules/employee/actions/employee";

import ReviewForm from "./ReviewForm";
import { LoadingWrapper } from "./ReviewForm.styled";

export class ReviewFormContainer extends PureComponent {
  constructor(props) {
    super(props);

    const { invalidCpfs } = props;

    this.state = {
      initialValues: {
        cpfs: invalidCpfs,
      },
      loading: false,
    };
  }

  componentDidUpdate = prevProps => {
    const {
      selectedCompany: { id: companyId },
      goBackDetails,
    } = this.props;
    const {
      selectedCompany: { id: prevCompanyId },
    } = prevProps;

    companyId !== prevCompanyId && goBackDetails();
  };

  onCheckCpfs = async cpfsList => {
    const {
      handleCheckCpfs,
      selectedStatusRequest,
      selectedReasonRequest,
      validCpfs,
    } = this.props;

    this.setState({ loading: true });

    const selectedReason =
      selectedStatusRequest === "ativar" ? activeReason : inactiveReason;

    const formValues = {
      ...cpfsList,
      reason: selectedReason.find(el => el.value === selectedReasonRequest)
        .value,
      reasonKey: selectedReason.find(el => el.value === selectedReasonRequest)
        .key,
      reasonDescription: selectedReason.find(
        el => el.value === selectedReasonRequest,
      ).label,
    };

    const { allValues, invalidCpfs, ...formatedValues } = this.formatValues(
      formValues,
    );

    const {
      validEntries,
      invalidEntries,
      differentEntries,
      oppositeStatusEntries,
    } = await handleCheckCpfs(allValues, invalidCpfs, formatedValues);

    const newValidCpfsList = [...validCpfs, ...validEntries];
    const newInvalidCpfsList = [
      ...invalidEntries,
      ...differentEntries,
      ...oppositeStatusEntries,
    ];

    this.setState({ loading: false });

    return { newValidCpfsList, newInvalidCpfsList };
  };

  onClickSubmitHandler = async ({ cpfs }) => {
    const {
      handleInvalidCpfs,
      handleValidCpfs,
      goForward,
      setChargebacksInfo,
    } = this.props;

    const cpfsList = { cpfs: cpfs.map(el => el.cpf) };

    const { newValidCpfsList, newInvalidCpfsList } = await this.onCheckCpfs(
      cpfsList,
    );

    handleInvalidCpfs(newInvalidCpfsList);

    handleValidCpfs(newValidCpfsList);

    this.setState({
      initialValues: {
        cpfs: newInvalidCpfsList,
      },
    });

    setChargebacksInfo(
      orderBy([...newValidCpfsList, ...newInvalidCpfsList], ["isValid", true]),
    );

    if (newInvalidCpfsList.length === 0) {
      goForward(false);
    }
  };

  handleCheckCpf = async (cpf, index, cpfsForm) => {
    const {
      handleInvalidCpfs,
      handleValidCpfs,
      goForward,
      setChargebacksInfo,
      // invalidCpfs,
    } = this.props;

    const cpfsList = { cpfs: [cpf] };

    const { newValidCpfsList, newInvalidCpfsList } = await this.onCheckCpfs(
      cpfsList,
    );

    let newInvalidList = [];

    if (newInvalidCpfsList.length === 0) {
      newInvalidList = cpfsForm.filter((_, i) => i !== index);

      handleValidCpfs(newValidCpfsList);
    } else {
      const cpfError = newInvalidCpfsList;

      newInvalidList = cpfsForm.map((el, i) =>
        i === index ? cpfError[0] : el,
      );
    }

    handleInvalidCpfs(newInvalidList);

    this.setState({
      initialValues: {
        cpfs: newInvalidList,
      },
    });

    setChargebacksInfo(
      orderBy([...newValidCpfsList, newInvalidList], ["isValid", true]),
    );

    if (newInvalidList.length === 0) {
      goForward(false);
    }
  };

  cleanUpCpfsEntries = cpfsArr => {
    if (!cpfsArr.length) {
      return [];
    }

    const formattedCpfsArr = cpfsArr.map(elem =>
      String(elem).replace(/[^0-9]+/g, ""),
    );

    return formattedCpfsArr;
  };

  formatValues = values => {
    const { cpfs } = values;
    const formattedCpfs = this.cleanUpCpfsEntries(cpfs);

    const filterCpfs = formattedCpfs.filter(el => el);
    const invalidCpfs = filterCpfs.filter(el => el && !CPF.isValid(el));

    return {
      ...values,
      allValues: filterCpfs,
      invalidCpfs,
    };
  };

  handleRemoveAllInvalidCpfs = () => {
    const { goBack, goForward, validCpfs, handleInvalidCpfs } = this.props;

    this.setState({
      initialValues: {
        cpfs: [],
      },
    });

    handleInvalidCpfs([]);

    if (validCpfs.length === 0) {
      goBack();
    } else {
      goForward(false);
    }
  };

  handleRemoveItem = (cpf, cpfsForm) => {
    const {
      goBack,
      goForward,
      // invalidCpfs,
      validCpfs,
      handleInvalidCpfs,
    } = this.props;

    let newInvalidCpfsList = [];

    if (cpfsForm) {
      newInvalidCpfsList = cpfsForm.filter(el => el.cpf !== cpf);
    }

    this.setState({
      initialValues: {
        cpfs: newInvalidCpfsList,
      },
    });

    handleInvalidCpfs(newInvalidCpfsList);

    if (newInvalidCpfsList.length === 0) {
      if (validCpfs.length === 0) {
        goBack();
      } else {
        goForward(false);
      }
    }
  };

  render() {
    const { goBack, goForward, validCpfs } = this.props;
    const { initialValues, loading } = this.state;

    return (
      <FormWrapper
        initialValues={initialValues}
        onSubmit={this.onClickSubmitHandler}
        enableReinitialize
      >
        {props => (
          <Fragment>
            <If test={loading}>
              <LoadingWrapper>
                <Loading loading />
              </LoadingWrapper>
            </If>
            <ReviewForm
              {...props}
              {...this.props}
              goBack={goBack}
              goForward={goForward}
              handleCheckCpf={this.handleCheckCpf}
              validCpfs={validCpfs}
              handleRemoveAllInvalidCpfs={this.handleRemoveAllInvalidCpfs}
              handleRemoveItem={this.handleRemoveItem}
            />
          </Fragment>
        )}
      </FormWrapper>
    );
  }
}

const mapStateToProps = ({
  employee: { chargeback },
  selectedCompanyTree: { selectedCompany },
}) => ({
  chargeback,
  selectedCompany,
});

export const mapDispatchToProps = {
  setChargebacksInfo: employeeActions.setChargebacksInfo,
};

ReviewFormContainer.propTypes = {
  chargeback: shape({}).isRequired,
  goBack: func.isRequired,
  goBackDetails: func.isRequired,
  goForward: func.isRequired,
  handleCheckCpfs: func.isRequired,
  handleInvalidCpfs: func.isRequired,
  handleValidCpfs: func.isRequired,
  invalidCpfs: arrayOf(shape({})).isRequired,
  selectedCompany: shape({}).isRequired,
  selectedReasonRequest: string.isRequired,
  selectedStatusRequest: string.isRequired,
  setChargebacksInfo: func.isRequired,
  validCpfs: arrayOf(shape({})).isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReviewFormContainer);
