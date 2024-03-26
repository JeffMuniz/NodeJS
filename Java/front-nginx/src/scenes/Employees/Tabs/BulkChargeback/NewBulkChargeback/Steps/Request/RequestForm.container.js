import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { func, shape, number } from "prop-types";
import { get, orderBy, difference, isEmpty, union } from "lodash";
import { CPF } from "cpf_cnpj";

import { toOnlyNumbers } from "@utils";

import FormWrapper from "src/modules/Form/Form";
import * as employeeActions from "src/redux/modules/employee/actions/employee";
import * as voucherActions from "src/redux/modules/voucher/actions/voucherActions";
import { employeeSearchRequest } from "src/redux/modules/chargeBack/action/ChargeBackSelected";
import { OrganizeEmployee, OrganizeCpf } from "src/api/dtos/chargeBack.dto";

import formSchema, { fields, initialValues } from "./RequestForm.schema";
import RequestForm from "./RequestForm";

const cleanUpCpfsEntries = cpfsArr => {
  if (!cpfsArr.length) {
    return [];
  }
  const formattedCpfsArr = cpfsArr
    .split(/[\r\n a-zA-Z]+/)
    .map(elem => String(elem).replace(/[^0-9]+/g, ""));

  return [...new Set(formattedCpfsArr)];
};

const formatValues = values => {
  const cpfs = cleanUpCpfsEntries(get(values, fields.cpfs, []));
  const filterCpfs = cpfs.filter(el => el);
  const invalidCpfs = filterCpfs.filter(el => el && !CPF.isValid(el));
  const validCpfs = filterCpfs.filter(el => el && !invalidCpfs.includes(el));

  return {
    ...values,
    [fields.vaDefaultValue]: get(values, fields.vaDefaultValue, 0) / 100,
    [fields.vrDefaultValue]: get(values, fields.vrDefaultValue, 0) / 100,
    [fields.cpfs]: validCpfs,
    allValues: filterCpfs,
    invalidCpfs,
  };
};

export class FormContainer extends PureComponent {
  componentDidMount() {
    const { chargeBackReason } = this.props;
    chargeBackReason();
  }

  onClickSubmitHandler = async values => {
    const {
      goForward,
      setChargebacksInfo,
      reasonInfo,
      employeeSearch,
      idGroup,
      idCompany,
      idEmployee,
    } = this.props;

    let cpfApi = [];
    let data = [];

    const filterReason = reasonInfo.payload.filter(
      el => el.name === values.reason,
    );
    const formValues = {
      ...values,
      reasonKey: filterReason[0].key,
      vaDefaultValue: toOnlyNumbers(values.vaDefaultValue),
      vrDefaultValue: toOnlyNumbers(values.vrDefaultValue),
    };

    const { allValues, invalidCpfs, ...formatedValues } = formatValues(
      formValues,
    );

    if (!isEmpty(formatedValues.cpfs)) {
      await employeeSearch(idGroup, idCompany, idEmployee, formatedValues.cpfs);

      data = await this.setPropsDto(formatedValues);
      cpfApi = await OrganizeCpf(data && data.map(el => el));
    }

    const differentCpfEntriesFromApi = difference(
      allValues,
      union(cpfApi, invalidCpfs),
    );

    let invalidEntries = [];
    let differentEntries = [];

    if (!isEmpty(invalidCpfs)) {
      invalidEntries = [...invalidCpfs].map(el => ({
        cpf: el,
        isValid: false,
        produtos: [],
      }));
    }

    differentEntries = [...differentCpfEntriesFromApi].map(el => ({
      cpf: el,
      isValid: false,
      isInvalidFromApi: true,
      produtos: [],
    }));

    setChargebacksInfo(
      orderBy(
        [...data, ...invalidEntries, ...differentEntries],
        ["isValid", true],
      ),
    );

    goForward();
  };

  async setPropsDto(values) {
    const { chargebackEmployee } = this.props;

    const data = await OrganizeEmployee(chargebackEmployee.payload, values);

    return data;
  }

  render() {
    return (
      <FormWrapper
        onSubmit={this.onClickSubmitHandler}
        validationSchema={formSchema}
        initialValues={initialValues}
      >
        {props => <RequestForm {...this.props} {...props} />}
      </FormWrapper>
    );
  }
}

FormContainer.propTypes = {
  goForward: func.isRequired,
  setChargebacksInfo: func.isRequired,
  chargeBackReason: func.isRequired,
  reasonInfo: shape({}).isRequired,
  employeeSearch: func.isRequired,
  chargebackEmployee: shape({}).isRequired,
  idGroup: number.isRequired,
  idCompany: number.isRequired,
  idEmployee: number.isRequired,
};

export const mapStateToProps = ({
  voucher: { reason },
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
  reasonInfo: get(reason, "payload", {}),
  chargebackEmployee,
  idGroup,
  idCompany,
  idEmployee,
});

const mapDispatchToProps = {
  setChargebacksInfo: employeeActions.setChargebacksInfo,
  chargeBackReason: voucherActions.chargeBackReason,
  employeeSearch: employeeSearchRequest,
};
export default connect(mapStateToProps, mapDispatchToProps)(FormContainer);
