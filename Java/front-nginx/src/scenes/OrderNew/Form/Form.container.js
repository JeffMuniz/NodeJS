import React, { Component } from "react";
import { connect } from "react-redux";
import { func, shape, string, number } from "prop-types";

import { CNPJ } from "cpf_cnpj";
import { Routes } from "src/routes/consts";
import { getLayoutFromFile, extractTicketFile } from "src/api/files/files";
import navigate from "src/routes/navigate";
import FormWrapper from "src/modules/Form/Form";
import FormSchemaValidator from "src/modules/Form/FormSchemaValidator";
import * as orderActions from "src/redux/modules/order/actions";
import * as ModalActions from "src/redux/modules/modal/actions/modal";
import * as deliveryPlacesActions from "src/redux/modules/deliveryPlaces/actions";
import { AlertMessage } from "@common";
import { toOnlyNumbers } from "@utils";
import {
  requestStatus,
  deliveryTypes,
  layoutTypes,
  errorMessages,
} from "@enums";

import Form from "./Form";
import LoadingModal from "../LoadingModal/LoadingModal";

const initialFormValues = {
  file: "",
};

const defaultErrorMessage = `Ops, houve um erro inesperado e o arquivo não foi enviado. Tente novamente!`;

export class FormContainer extends Component {
  constructor(props) {
    super(props);
    this.fileInputRef = React.createRef();
  }

  state = {
    file: {},
    isFileValid: false,
    isFileSizeValid: false,
    showConverterDateField: false,
    showConverterForm: false,
    conversionError: null,
    clientCodes: null,
    formSchema: null,
    shouldDisplayAlertMessageModal: false,
    datePickerFocused: false,
  };

  componentDidMount() {
    const deliveryTypeIsHr = this.isHRDeliveryType();
    if (deliveryTypeIsHr) {
      this.shouldDisplayAlertMessageModal();
    }
  }

  onChangeFocus = () => {
    const { datePickerFocused } = this.state;
    this.setState({ datePickerFocused: !datePickerFocused });
  };

  getOrderData = () => {
    const {
      userData: { id: idUser },
      selectedGroup: { id: idGroup },
    } = this.props;
    const { file } = this.state;

    const data = {
      file,
      idUser,
      idGroup,
    };

    return data;
  };

  feedbackUpload = () => {
    if (this.isUploadSuccess()) {
      return this.goToNextRouter();
    }

    this.setState({
      isFileValid: false,
      isFileSizeValid: false,
      showConverterDateField: false,
      showConverterForm: false,
      conversionError: null,
      clientCodes: null,
      formSchema: null,
    });
  };

  clearError = () =>
    this.setState({
      file: {},
      isFileValid: false,
      isFileSizeValid: false,
      showConverterDateField: false,
      showConverterForm: false,
      conversionError: null,
      clientCodes: null,
      formSchema: null,
      shouldDisplayAlertMessageModal: false,
    });

  goToNextRouter = () => this.goToPageOrders(true);

  goToPageOrders = value => {
    const { history, navigator } = this.props;
    const nav = navigator || history;

    const filterByAllStatus = value === true;

    navigate(nav, {
      route: Routes.ORDERS_DASHBOARD,
      data: { filterByAllStatus },
    });
  };

  isUploadSuccess = () => {
    const { newOrderStatus } = this.props;
    return requestStatus.success === newOrderStatus.requestStatus;
  };

  isFileSelected = () => {
    const { file } = this.state;

    return file && file.name;
  };

  isExtencionFileValid = fileName => {
    const regex = new RegExp("(.*?).(xls|xlsx)$");

    return regex.test(fileName);
  };

  isFileSizeValid = fileSize => fileSize <= 10485760; // 10mb

  cleanFeedbackMessage = async () => {
    const {
      resetNewOrder,
      newOrderStatus: { error },
    } = this.props;
    const requestError = error && error.message ? error.message : "";

    if (requestError) {
      await resetNewOrder();
    }

    return false;
  };

  openAlertMessageModal = () => {
    const { openModal, closeModal } = this.props;

    return openModal({
      children: (
        <AlertMessage
          iconName="information"
          title="Importante:"
          message="Seus locais de entrega ainda estão sendo processados. Aguarde antes de fazer um novo pedido."
          buttonText="Ok"
          buttonAction={closeModal}
        />
      ),
    });
  };

  isHRDeliveryType = () => {
    const {
      selectedGroup: {
        params: { deliveryType },
      },
    } = this.props;
    return deliveryType === deliveryTypes.HR;
  };

  shouldDisplayAlertMessageModal = async () => {
    const { getDeliveryPLaceNotifications } = this.props;

    const {
      thereIsActiveDP,
      thereIsSheetProcessing,
    } = await getDeliveryPLaceNotifications();

    const shouldDisplayAlertMessageModal =
      !thereIsActiveDP || thereIsSheetProcessing;

    this.setState({ shouldDisplayAlertMessageModal });
  };

  openFileDialog = async () => {
    const { shouldDisplayAlertMessageModal } = this.state;

    if (shouldDisplayAlertMessageModal) {
      return this.openAlertMessageModal();
    }

    this.fileInputRef.current.click();
  };

  isTextFile = fileName => /(.*?).(txt|TXT)/g.test(fileName);

  isValidCnpj = value => value && CNPJ.isValid(toOnlyNumbers(value));

  generateFormValidation = codes => {
    const formValidation = {};

    // eslint-disable-next-line array-callback-return
    codes.map((code, index) => {
      const label = `cnpjCliente_${index}`;
      formValidation[label] = FormSchemaValidator.string()
        .required(errorMessages.FieldRequired)
        .test(label, errorMessages.InvalidCNPJ, this.isValidCnpj);
    });
    const formSchema = FormSchemaValidator.object().shape(formValidation);
    this.setState({ formSchema });
  };

  handleFile = async file => {
    const { openModal, closeModal } = this.props;
    openModal({
      children: <LoadingModal />,
      hideCloseButton: true,
    });
    try {
      const layout = await getLayoutFromFile(file);

      switch (layout) {
        case layoutTypes.ALELO:
          return this.setState({
            isFileValid: true,
            file,
          });

        case layoutTypes.VB:
          return this.setState({
            showConverterDateField: true,
          });

        // eslint-disable-next-line no-case-declarations
        default:
          const codes = await extractTicketFile(file, layout);
          return this.setState({
            showConverterForm: true,
            clientCodes: codes,
          });
      }
    } catch (error) {
      this.handleFileErrors(error);
    } finally {
      closeModal();
    }
  };

  handleFileErrors = error => {
    if (error && error.data && error.data.message) {
      const label = error.data.message
        ? error.data.message
        : defaultErrorMessage;
      return this.setState({ conversionError: label });
    }
    if (error.message) {
      return this.setState({ conversionError: error.message });
    }
    this.setState({ conversionError: defaultErrorMessage });
  };

  handleChangeFile = event => {
    const [file] = event.currentTarget.files;
    const isFileSizeValid = this.isFileSizeValid(file.size);

    this.setState({
      showConverterForm: false,
      clientCodes: null,
      showConverterDateField: false,
      conversionError: null,
      isFileSizeValid,
      file,
    });

    this.cleanFeedbackMessage();

    if (!isFileSizeValid) {
      this.setState({ isFileValid: false });
      return;
    }

    const isTextFile = this.isTextFile(file.name);

    if (isTextFile) {
      this.setState({ isFileValid: true });
      return this.handleFile(file);
    }

    const isFileValid = this.isExtencionFileValid(file.name);

    this.setState({ isFileValid });
  };

  uploadTextFile = async (formSubmittedData, payload, resetForm) => {
    const { closeModal, newOrderFromTxt } = this.props;
    const { clientCodes } = this.state;

    await newOrderFromTxt({
      formSubmittedData,
      payload,
      clientCodes,
    });

    closeModal();
    resetForm();
    this.feedbackUpload();
  };

  submit = async (formSubmittedData, { resetForm }) => {
    const { openModal, closeModal, newOrder, newOrderStatus } = this.props;

    openModal({
      children: <LoadingModal loadingStatus={newOrderStatus} />,
      hideCloseButton: true,
    });

    const payload = this.getOrderData();

    const isTextFile = this.isTextFile(payload.file.name);

    if (isTextFile) {
      return this.uploadTextFile(formSubmittedData, payload, resetForm);
    }

    await newOrder(payload);

    closeModal();
    this.feedbackUpload();
  };

  render() {
    const {
      file,
      isFileValid,
      isFileSizeValid,
      showConverterDateField,
      showConverterForm,
      clientCodes,
      formSchema,
      conversionError,
      datePickerFocused,
    } = this.state;
    const {
      newOrderStatus: { error },
    } = this.props;

    const requestError = error && error.message ? error.message : "";

    return (
      <FormWrapper
        initialValues={initialFormValues}
        onSubmit={this.submit}
        render={props => (
          <Form
            datePickerFocused={datePickerFocused}
            onChangeFocus={this.onChangeFocus}
            clearError={this.clearError}
            conversionError={conversionError}
            showDateField={showConverterDateField}
            showConverterForm={showConverterForm}
            clientCodes={clientCodes}
            formSchema={formSchema}
            fileInputRef={this.fileInputRef}
            openFileDialog={this.openFileDialog}
            file={file}
            isFileValid={isFileValid}
            isFileSizeValid={isFileSizeValid}
            isFileSelected={this.isFileSelected}
            handleChangeFile={this.handleChangeFile}
            goToPageOrders={this.goToPageOrders}
            requestError={requestError}
            {...props}
          />
        )}
      />
    );
  }
}

FormContainer.propTypes = {
  newOrder: func.isRequired,
  newOrderFromTxt: func.isRequired,
  resetNewOrder: func.isRequired,
  userData: shape({
    id: string,
  }),
  newOrderStatus: shape({
    requestStatus: string,
    error: shape({
      code: string,
      message: string,
      type: string,
    }),
  }),
  selectedGroup: shape({
    id: number,
    name: string,
  }),
  openModal: func,
  closeModal: func,
  getDeliveryPLaceNotifications: func.isRequired,
};

FormContainer.defaultProps = {
  userData: {},
  newOrderStatus: {},
  selectedGroup: {},
  openModal: () => null,
  closeModal: () => null,
};

export function mapStateToProps({
  order: { newOrderStatus, error },
  user: {
    profile: { data: userData },
  },
  selectedCompanyTree,
}) {
  return {
    userData,
    orderError: error,
    newOrderStatus,
    selectedGroup: selectedCompanyTree.selectedGroup,
  };
}

const mapDispatchToProps = {
  openModal: ModalActions.OpenModal,
  closeModal: ModalActions.CloseModal,
  newOrder: orderActions.newOrder,
  newOrderFromTxt: orderActions.newOrderFromTxt,
  getDeliveryPLaceNotifications: deliveryPlacesActions.getNotifications,
  resetNewOrder: orderActions.resetNewOrder,
};

export default connect(mapStateToProps, mapDispatchToProps)(FormContainer);
