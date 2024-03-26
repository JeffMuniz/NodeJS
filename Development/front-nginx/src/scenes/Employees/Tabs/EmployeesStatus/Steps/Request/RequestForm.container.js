import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { func, number, shape, string } from "prop-types";
import { get, orderBy } from "lodash";
import { CPF } from "cpf_cnpj";

import { Loading } from "@base";
import { activeReason, inactiveReason, requestStatus as status } from "@enums";
import { addZeroLeft, If } from "@utils";

import FormWrapper from "src/modules/Form/Form";
import * as employeeActions from "src/redux/modules/employee/actions/employee";
import { employeeSearchRequest } from "src/redux/modules/chargeBack/action/ChargeBackSelected";
import { OrganizeEmployee } from "src/api/dtos/employee.dto";

import formSchema, { fields, initialValues } from "./RequestForm.schema";
import RequestForm from "./RequestForm";

import { Header, Title, LoadingWrapper } from "./RequestForm.styled";

export class RequestFormContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedStatus: "",
      selectedReason: [],
    };
  }

  onChangeSelectedStatusOption = value => {
    const { onStatusRequestChange } = this.props;

    this.setState({
      selectedStatus: value,
      selectedReason: value === "ativar" ? activeReason : inactiveReason,
    });

    onStatusRequestChange(value);
  };

  async setPropsDto(values) {
    const { chargebackEmployee } = this.props;

    const data = await OrganizeEmployee(chargebackEmployee.payload, values);

    return data;
  }

  formatValues = values => {
    const cleanCpfs = this.cleanUpCpfsEntries(get(values, fields.cpfs, []));
    const cpfs = cleanCpfs.map(e => addZeroLeft(e));
    const filterCpfs = cpfs.filter(el => el);
    const invalidCpfs = filterCpfs.filter(el => el && !CPF.isValid(el));
    const validCpfs = filterCpfs.filter(el => el && !invalidCpfs.includes(el));

    return {
      ...values,
      [fields.cpfs]: validCpfs,
      allValues: filterCpfs,
      invalidCpfs,
    };
  };

  cleanUpCpfsEntries = cpfsArr => {
    if (!cpfsArr.length) {
      return [];
    }

    const formattedCpfsArr = cpfsArr
      .split(/[\r\n a-zA-Z]+/)
      .map(elem => String(elem).replace(/[^0-9]+/g, ""));

    return [...new Set(formattedCpfsArr)];
  };

  handleOnClickSubmit = async values => {
    const {
      goForward,
      setChargebacksInfo,
      handleCheckCpfs,
      handleInvalidCpfs,
      handleValidCpfs,
    } = this.props;
    const { selectedReason } = this.state;
    const { reason } = values;

    const formValues = {
      ...values,
      reasonKey: selectedReason.find(el => el.value === reason).key,
      reasonDescription: selectedReason.find(el => el.value === reason).label,
    };

    const { allValues, invalidCpfs, ...formatedValues } = this.formatValues(
      formValues,
    );

    const {
      validEntries,
      invalidEntries,
      differentEntries,
      oppositeStatusEntries,
    } = await handleCheckCpfs(allValues, invalidCpfs, formatedValues, reason);

    const hasErrors =
      invalidEntries.length > 0 ||
      differentEntries.length > 0 ||
      oppositeStatusEntries.length > 0;

    setChargebacksInfo(
      orderBy(
        [
          ...validEntries,
          ...invalidEntries,
          ...differentEntries,
          ...oppositeStatusEntries,
        ],
        ["isValid", true],
      ),
    );

    handleInvalidCpfs([
      ...invalidEntries,
      ...differentEntries,
      ...oppositeStatusEntries,
    ]);

    handleValidCpfs([...validEntries]);

    goForward(hasErrors);
  };

  render() {
    const {
      chargebackEmployee: { requestStatus },
    } = this.props;
    const { selectedReason, selectedStatus } = this.state;

    return (
      <div>
        <If test={requestStatus === status.loading}>
          <LoadingWrapper>
            <Loading loading />
          </LoadingWrapper>
        </If>
        <Header>
          <Title id="form-request-header-title">
            Inativação / ativação de funcionários
          </Title>
        </Header>
        <FormWrapper
          onSubmit={this.handleOnClickSubmit}
          validationSchema={formSchema}
          initialValues={initialValues}
        >
          {props => (
            <RequestForm
              selectedReason={selectedReason}
              selectedStatus={selectedStatus}
              onChangeSelectedStatusOption={this.onChangeSelectedStatusOption}
              {...props}
            />
          )}
        </FormWrapper>
      </div>
    );
  }
}

RequestFormContainer.propTypes = {
  goForward: func.isRequired,
  handleCheckCpfs: func.isRequired,
  handleInvalidCpfs: func.isRequired,
  handleValidCpfs: func.isRequired,
  onStatusRequestChange: func.isRequired,
  employeeSearch: func.isRequired,
  chargebackEmployee: shape({}).isRequired,
  idGroup: number.isRequired,
  idCompany: number.isRequired,
  idEmployee: string.isRequired,
  setChargebacksInfo: func.isRequired,
};

export const mapStateToProps = ({
  selectedCompanyTree: {
    selectedGroup: { id: idGroup },
    selectedCompany: { id: idCompany },
  },
  user: {
    profile: {
      data: { id: idEmployee },
    },
  },
  chargeBack: { chargebackEmployee },
}) => ({
  chargebackEmployee,
  idGroup,
  idCompany,
  idEmployee,
});

const mapDispatchToProps = {
  setChargebacksInfo: employeeActions.setChargebacksInfo,
  employeeSearch: employeeSearchRequest,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RequestFormContainer);
