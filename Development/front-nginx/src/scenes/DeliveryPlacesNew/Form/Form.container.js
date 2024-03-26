import React, { Component } from "react";
import { connect } from "react-redux";
import { func, shape, string, number } from "prop-types";

import { Routes } from "src/routes/consts";
import navigate from "src/routes/navigate";
import FormWrapper from "src/modules/Form/Form";
import * as DeliveryPlacesActions from "src/redux/modules/deliveryPlaces/actions";
import * as ModalActions from "src/redux/modules/modal/actions/modal";
import { requestStatus } from "@enums";

import LoadingModal from "../LoadingModal/LoadingModal";
import Form from "./Form";

const initialFormValues = {
  file: "",
};

export class FormContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      file: "",
      isFileValid: false,
    };
  }

  componentDidMount() {
    const { location } = this.props;

    if (!location.state || !location.state.file) {
      this.goTo(Routes.DELIVERY_PLACES);
      return;
    }

    this.setFile();
  }

  setFile = () => {
    const {
      location: {
        state: { file },
      },
    } = this.props;

    this.setState({
      file,
      isFileValid: this.isExtensionFileValid(file.name),
    });
  };

  getDeliveryPlacesData = () => {
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
      this.goToNextRouter();
      return;
    }

    this.setState({ isFileValid: false });
  };

  goToNextRouter = () => this.goTo(Routes.DELIVERY_PLACES_SUCCESS)();

  goTo = route => () => {
    // eslint-disable-next-line react/destructuring-assignment
    const navigator = this.props.navigator || this.props.history;

    navigate(navigator, { route });
  };

  isUploadSuccess = () => {
    const { newDeliveryPlacesStatus } = this.props;
    return requestStatus.success === newDeliveryPlacesStatus.requestStatus;
  };

  isFileSelected = () => {
    const { file } = this.state;

    return file && file.name;
  };

  isExtensionFileValid = fileName => {
    const regex = new RegExp("(.*?).(xls|xlsx)$");

    return regex.test(fileName);
  };

  cleanFeedbackMessage = () => {
    const {
      newDeliveryPlacesStatus: { error },
      resetNewDeliveryPlaces,
    } = this.props;

    const requestError = error && error.message ? error.message : "";

    if (requestError) {
      resetNewDeliveryPlaces();
    }
  };

  handleChangeFile = event => {
    const [file] = event.currentTarget.files;
    const { navigator, location } = this.props;
    const isFileValid = this.isExtensionFileValid(file.name);
    navigator.replace(location.pathname, { file });
    this.cleanFeedbackMessage();
    this.setState({ isFileValid, file });
  };

  submit = async () => {
    const { openModal, closeModal, newDeliveryPlaces } = this.props;

    openModal({ children: <LoadingModal />, hideCloseButton: true });

    const payload = this.getDeliveryPlacesData();

    await newDeliveryPlaces(payload);

    closeModal();
    this.feedbackUpload();
  };

  render() {
    const { file, isFileValid } = this.state;
    const {
      newDeliveryPlacesStatus: { error },
    } = this.props;

    const requestError = error && error.message ? error.message : "";

    return (
      <FormWrapper
        initialValues={initialFormValues}
        onSubmit={this.submit}
        render={props => (
          <Form
            file={file}
            isFileValid={isFileValid}
            isFileSelected={this.isFileSelected}
            handleChangeFile={this.handleChangeFile}
            goToDeliveryPlaces={this.goTo(Routes.DELIVERY_PLACES)}
            requestError={requestError}
            fileInputRef={this.fileInputRef}
            {...props}
          />
        )}
      />
    );
  }
}

FormContainer.propTypes = {
  newDeliveryPlaces: func.isRequired,
  resetNewDeliveryPlaces: func.isRequired,
  userData: shape({
    id: string,
  }),
  newDeliveryPlacesStatus: shape({
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
  location: shape({}),
  openModal: func.isRequired,
  closeModal: func.isRequired,
};

FormContainer.defaultProps = {
  userData: {},
  newDeliveryPlacesStatus: {},
  selectedGroup: {},
  location: {},
};

export const mapStateToProps = ({
  deliveryPlaces: { newDeliveryPlacesStatus },
  user: {
    profile: { data: userData },
  },
  selectedCompanyTree: { selectedGroup },
}) => ({
  userData,
  newDeliveryPlacesStatus,
  selectedGroup,
});

const mapDispatchToProps = {
  openModal: ModalActions.OpenModal,
  closeModal: ModalActions.CloseModal,
  newDeliveryPlaces: DeliveryPlacesActions.newDeliveryPlaces,
  resetNewDeliveryPlaces: DeliveryPlacesActions.resetNewDeliveryPlaces,
};

export default connect(mapStateToProps, mapDispatchToProps)(FormContainer);
