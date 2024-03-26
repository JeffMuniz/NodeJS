import React, { PureComponent } from "react";
import { shape, func } from "prop-types";
import { connect } from "react-redux";

import FormWrapper from "src/modules/Form/Form";
import * as modalActions from "src/redux/modules/modal/actions/modal";
import { FormatedProduct } from "src/api/dtos/chargeBack.dto";
import { inputToMoney, toMoney } from "@utils";

import ReviewForm from "./ReviewForm";
import ConfirmationModal from "./ConfirmationModal";
import formSchema from "./ReviewForm.schema";

export class FormContainer extends PureComponent {
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
  onClickSubmitHandler = ({ cpfs }) => {
    const formattedValues = {
      cpfs: cpfs.map(item => ({
        ...item,
        id: item.id,
        vr: inputToMoney(item.vr),
        va: inputToMoney(item.va),
        produtos: [
          {
            produto: "VR",
            valor_solicitado: toMoney(inputToMoney(item.vr)),
          },
          {
            produto: "VA",
            valor_solicitado: toMoney(inputToMoney(item.va)),
          },
        ],
      })),
    };

    this.openConfirmationModal(formattedValues);
  };

  openConfirmationModal = values => {
    const { openModal, goBackDetails } = this.props;

    return openModal({
      children: (
        <ConfirmationModal values={values} goBackDetails={goBackDetails} />
      ),
    });
  };

  render() {
    const {
      chargeback: { data },
      goBack,
    } = this.props;

    const details = FormatedProduct(data);

    return (
      <FormWrapper
        initialValues={{ cpfs: details }}
        onSubmit={this.onClickSubmitHandler}
        validationSchema={formSchema}
        enableReinitialize
      >
        {props => <ReviewForm {...props} goBack={goBack} />}
      </FormWrapper>
    );
  }
}

const mapStateToProps = ({
  employee: { chargeback },
  selectedCompanyTree: { selectedCompany },
}) => ({ chargeback, selectedCompany });

export const mapDispatchToProps = {
  openModal: modalActions.OpenModal,
  closeModal: modalActions.CloseModal,
};

FormContainer.propTypes = {
  goBack: func.isRequired,
  openModal: func.isRequired,
  closeModal: func.isRequired,
  chargeback: shape({}).isRequired,
  goBackDetails: func.isRequired,
  selectedCompany: shape({}).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(FormContainer);
