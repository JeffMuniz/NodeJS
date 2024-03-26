import React, { Component } from "react";
import { connect } from "react-redux";
import navigate from "src/routes/navigate";
import { Routes } from "src/routes/consts";
import { func, shape, number, arrayOf, string } from "prop-types";
import { AlertMessage } from "@common";
import * as DeliveryPlacesActions from "src/redux/modules/deliveryPlaces/actions";
import * as modalActions from "src/redux/modules/modal/actions/modal";
import DeliveryPlacesErrorsList from "./DeliveryPlacesErrors";

class DeliveryPlacesErrorsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { thereIsSheetProcessing: false };
    this.fileInputRef = React.createRef();
  }

  async componentDidMount() {
    const {
      getDeliveryPlacesErrors,
      match: {
        params: { fileId },
      },
      loggedUserId,
      groupId,
    } = this.props;

    if (fileId)
      await getDeliveryPlacesErrors({ loggedUserId, groupId, fileId });

    await this.checkForDeliveryPlacesNotifications();
  }

  onChange = event => {
    const [file] = event.currentTarget.files;

    this.routeToDeliveryPlacesNew(file);
  };

  checkForDeliveryPlacesNotifications = async () => {
    const { getDeliveryPlaceNotifications } = this.props;
    const { thereIsSheetProcessing } = await getDeliveryPlaceNotifications();
    this.setState({ thereIsSheetProcessing });
  };

  goToPageDeliveryPlaces = () => {
    const { navigator, history } = this.props;
    const nav = navigator || history;

    navigate(nav, { route: Routes.DELIVERY_PLACES });
  };

  callback = async ({ page, size }) => {
    const {
      getDeliveryPlacesErrors,
      match: {
        params: { fileId },
      },
      loggedUserId,
      groupId,
    } = this.props;

    await getDeliveryPlacesErrors({
      loggedUserId,
      groupId,
      fileId,
      page,
      size,
    });
  };

  openFileDialog = async () => {
    const { thereIsSheetProcessing } = this.state;
    const { openModal, closeModal } = this.props;

    if (thereIsSheetProcessing) {
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
    }

    this.fileInputRef.current.click();
  };

  routeToDeliveryPlacesNew = file => {
    const { history } = this.props;
    const navigateParams = {
      route: Routes.DELIVERY_PLACES_NEW,
      data: { file },
    };

    navigate(history, navigateParams);
  };

  render() {
    const {
      errorsData: { content, totalItems },
      errorsStatus,
    } = this.props;
    const hasErrors = content && content.length;

    return (
      <DeliveryPlacesErrorsList
        errorsList={{ content, totalItems }}
        hasErrors={!!hasErrors}
        errorsStatus={errorsStatus}
        callback={this.callback}
        headerClickHandler={this.goToPageDeliveryPlaces}
        fileInputRef={this.fileInputRef}
        openFileDialog={this.openFileDialog}
        onChange={this.onChange}
      />
    );
  }
}

DeliveryPlacesErrorsContainer.propTypes = {
  getDeliveryPlacesErrors: func.isRequired,
  getDeliveryPlaceNotifications: func.isRequired,
  match: shape({
    params: shape({
      fileId: string,
    }),
  }).isRequired,
  errorsData: shape({
    content: arrayOf(shape({})),
    totalItems: number,
  }),
  errorsStatus: string,
  loggedUserId: string.isRequired,
  groupId: string.isRequired,
  openModal: func.isRequired,
  closeModal: func.isRequired,
};

DeliveryPlacesErrorsContainer.defaultProps = {
  errorsData: {
    content: [],
    totalItems: 0,
  },
  errorsStatus: "none",
};

const mapStateToProps = ({
  deliveryPlaces: {
    deliveryPlacesErrors: { error, requestStatus, data },
  },
  user: {
    profile: {
      data: { id: loggedUserId },
    },
  },
  selectedCompanyTree: {
    selectedGroup: { id: groupId },
  },
}) => ({
  error,
  errorsStatus: requestStatus,
  errorsData: data,
  groupId,
  loggedUserId,
});

const mapDispatchToProps = {
  getDeliveryPlacesErrors: DeliveryPlacesActions.getDeliveryPlacesErrors,
  getDeliveryPlaceNotifications: DeliveryPlacesActions.getNotifications,
  openModal: modalActions.OpenModal,
  closeModal: modalActions.CloseModal,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DeliveryPlacesErrorsContainer);
