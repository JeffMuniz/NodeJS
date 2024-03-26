import React, { Component } from "react";
import { connect } from "react-redux";
import { func } from "prop-types";
import { CNPJ } from "cpf_cnpj";
import FormWrapper from "src/modules/Form/Form";
import FormSchemaValidator from "src/modules/Form/FormSchemaValidator";
import * as orderActions from "src/redux/modules/order/actions";
import * as ModalActions from "src/redux/modules/modal/actions/modal";
import * as deliveryPlacesActions from "src/redux/modules/deliveryPlaces/actions";
import { showToast as showToastAction } from "src/common/Toast/redux/actions/toast";
import {
  uploadTicketFile,
  getLayoutFromFile,
  extractTicketFile,
  uploadAleloTicket,
  uploadVBTicketFile,
} from "src/api/files/files";
import { toOnlyNumbers } from "@utils";
import { errorMessages, layoutTypes } from "@enums";

import Form from "./Form";
import LoadingModal from "../LoadingModal/LoadingModal";

const isValidCnpj = value => value && CNPJ.isValid(toOnlyNumbers(value));
const defaultErrorMessage = `Ops, houve um erro inesperado e o arquivo não foi enviado. Tente novamente!`;

const defaultCodeValues = {
  codigo: "",
  cnpj: "",
};

const initialFormValues = {};

export class FormContainer extends Component {
  constructor(props) {
    super(props);
    this.fileInputRef = React.createRef();
    this.state = {
      file: {},
      isFileValid: false,
      clientCodes: [defaultCodeValues],
      showUpload: true,
      showData: false,
      formSchema: null,
      showDateField: false,
      datePickerFocused: false,
    };
  }

  onChangeFocus = () => {
    const { datePickerFocused } = this.state;
    this.setState({ datePickerFocused: !datePickerFocused });
  };

  onBackButton = () => {
    this.setState({ showUpload: true, showData: false, showDateField: false });
  };

  isFileSelected = () => {
    const { file } = this.state;

    return file && file.name;
  };

  isExtensionFileValid = fileName => {
    const regex = new RegExp("(.*?).(txt|TXT)$");

    return regex.test(fileName);
  };

  openFileDialog = async () => {
    this.fileInputRef.current.click();
  };

  handleChangeFile = event => {
    const [file] = event.currentTarget.files;
    const isFileValid = this.isExtensionFileValid(file.name);
    this.setState({ isFileValid, file });
  };

  uploadFile = async formData => {
    const { openModal, closeModal, showToast } = this.props;
    const { file, clientCodes } = this.state;

    const layout = await getLayoutFromFile(file);

    if (layout === layoutTypes.VB) {
      const { dataPedido } = formData;
      openModal({
        children: <LoadingModal />,
        hideCloseButton: true,
      });
      try {
        await uploadVBTicketFile({ file, dataPedido }, layout);
      } catch (error) {
        const label = error.data.error ? error.data.error : defaultErrorMessage;
        showToast({
          id: "error_toast_message",
          label,
        });
      } finally {
        closeModal();
      }
    } else {
      const data = [];
      Object.keys(formData).map((key, index) =>
        data.push({
          codigo: clientCodes[index],
          cnpj: toOnlyNumbers(formData[key]),
        }),
      );
      openModal({
        children: <LoadingModal />,
        hideCloseButton: true,
      });
      try {
        await uploadTicketFile({ file, data }, layout);
        this.setState({
          showUpload: false,
          showData: true,
          showDateField: false,
        });
      } catch (error) {
        const label = error.data.error ? error.data.error : defaultErrorMessage;
        showToast({
          id: "error_toast_message",
          label,
        });
      } finally {
        closeModal();
      }
    }
  };

  generateFormValidation = codes => {
    const formValidation = {};

    // eslint-disable-next-line array-callback-return
    codes.map((code, index) => {
      const label = `cnpjCliente_${index}`;
      formValidation[label] = FormSchemaValidator.string()
        .required(errorMessages.FieldRequired)
        .test(label, errorMessages.InvalidCNPJ, isValidCnpj);
    });
    const formSchema = FormSchemaValidator.object().shape(formValidation);
    this.setState({ formSchema });
  };

  generateClientCodes = clientCodes =>
    this.setState({
      showUpload: false,
      showData: true,
      clientCodes,
    });

  validateFile = async () => {
    const { openModal, closeModal, showToast } = this.props;
    const { file } = this.state;
    openModal({
      children: <LoadingModal />,
      hideCloseButton: true,
    });
    try {
      const layout = await getLayoutFromFile(file);
      if (layout === layoutTypes.ALELO) {
        return await uploadAleloTicket({ file }, layout);
      }
      if (layout === layoutTypes.VB) {
        return this.setState({ showDateField: true, showUpload: false });
      }
      const codes = await extractTicketFile(file, layout);
      this.generateClientCodes(codes);
      this.generateFormValidation(codes);
    } catch (error) {
      const label =
        error.data && error.data.message
          ? error.data.message
          : defaultErrorMessage;
      showToast({
        id: "error_toast_message",
        label,
      });
    } finally {
      closeModal();
    }
  };

  render() {
    const {
      file,
      isFileValid,
      clientCodes,
      showData,
      showUpload,
      formSchema,
      showDateField,
      datePickerFocused,
    } = this.state;

    return (
      <FormWrapper
        initialValues={initialFormValues}
        onSubmit={this.uploadFile}
        validationSchema={formSchema}
        render={props => (
          <Form
            datePickerFocused={datePickerFocused}
            onChangeFocus={this.onChangeFocus}
            fileInputRef={this.fileInputRef}
            openFileDialog={this.openFileDialog}
            file={file}
            submitValidation={this.validateFile}
            isFileValid={isFileValid}
            isFileSelected={this.isFileSelected}
            handleChangeFile={this.handleChangeFile}
            handleBackButton={this.onBackButton}
            clientCodes={clientCodes}
            showData={showData}
            showUpload={showUpload}
            showDateField={showDateField}
            {...props}
          />
        )}
      />
    );
  }
}

FormContainer.propTypes = {
  uploadFile: func.isRequired,
  validateFile: func.isRequired,
  getDeliveryPLaceNotifications: func.isRequired,
  openModal: func,
  closeModal: func,
  showToast: func,
};

FormContainer.defaultProps = {
  openModal: () => null,
  closeModal: () => null,
  showToast: () => null,
};

export function mapStateToProps({ selectedCompanyTree }) {
  return {
    selectedGroup: selectedCompanyTree.selectedGroup,
  };
}

const mapDispatchToProps = {
  openModal: ModalActions.OpenModal,
  closeModal: ModalActions.CloseModal,
  newOrder: orderActions.newOrder,
  getDeliveryPLaceNotifications: deliveryPlacesActions.getNotifications,
  resetNewOrder: orderActions.resetNewOrder,
  showToast: showToastAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(FormContainer);
