import React, { Component } from "react";
import { connect } from "react-redux";
import { func, shape, string, arrayOf, number, bool } from "prop-types";
import * as deliveryPlacesActions from "src/redux/modules/deliveryPlaces/actions";
import * as modalActions from "src/redux/modules/modal/actions/modal";
import { getUserAccessLevel as getUserAccessLevelAction } from "src/redux/modules/user/actions/getAccessLevel";
import { userAccessLevel, deliveryTypes } from "@enums";

import navigate from "src/routes/navigate";
import { Routes, WebPaths } from "src/routes/consts";
import * as orderActions from "src/redux/modules/order/actions";
import { AlertMessage } from "@common";
import DeliveryPlaces from "./DeliveryPlaces";

export class DeliveryPlacesContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOrderFileBeingProcessed: false,
      thereIsSheetProcessing: false,
      loading: false,
    };
    this.fileInputRef = React.createRef();
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    const { selectedGroup } = this.props;

    if (
      prevProps.selectedGroup &&
      prevProps.selectedGroup.id !== selectedGroup.id
    ) {
      this.fetchData();
    }
  }

  onChange = event => {
    const [file] = event.currentTarget.files;

    this.routeToDeliveryPlacesNew(file);
  };

  getPlaces = ({ page, placeId } = {}) => {
    const { getDeliveryPlaces, loggedUserId, groupId } = this.props;

    getDeliveryPlaces({ loggedUserId, groupId, page, placeId });
  };

  openFileDialog = () => {
    const { closeModal } = this.props;
    closeModal();
    this.fileInputRef.current.click();
  };

  handleGoBack = () => {
    const {
      history: { push },
    } = this.props;

    push(WebPaths[Routes.ORDERS_DASHBOARD]);
  };

  openFileDialogHandler = async () => {
    const { openModal, closeModal } = this.props;
    const { isOrderFileBeingProcessed, thereIsSheetProcessing } = this.state;

    if (isOrderFileBeingProcessed) {
      return openModal({
        children: (
          <AlertMessage
            iconName="information"
            title="Importante:"
            message="Você têm pedidos já realizados em andamento. Esta alteração dos locais de entrega só vai valer para os próximos pedidos."
            buttonText="Ok"
            buttonAction={this.openFileDialog}
          />
        ),
      });
    }

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

    this.openFileDialog();
  };

  fetchData = async () => {
    const {
      getOrderNotifications,
      getDeliveryPlaceNotifications,
      loggedUserId,
      loggedUserCpf,
      groupId,
      history,
      deliveryType,
      getUserAccessLevel,
    } = this.props;

    if (deliveryType === deliveryTypes.door2Door) {
      return navigate(history, {
        route: Routes.ORDERS_DASHBOARD,
      });
    }

    this.setState({ loading: true });

    try {
      const { isOrderFileBeingProcessed } = await getOrderNotifications();
      const { thereIsSheetProcessing } = await getDeliveryPlaceNotifications();

      this.setState({ isOrderFileBeingProcessed, thereIsSheetProcessing });

      await getUserAccessLevel({
        cpf: loggedUserCpf,
        idGroup: groupId,
        idLoggedUser: loggedUserId,
      });

      this.setState({ loading: false });

      this.getPlaces();
    } catch (err) {
      this.setState({ loading: false });
    }
  };

  routeToDeliveryPlacesNew = file => {
    const { history } = this.props;
    const navigateParams = {
      route: Routes.DELIVERY_PLACES_NEW,
      data: { file },
    };

    navigate(history, navigateParams);
  };

  routeToDeliveryPlacesNewManually = () => {
    const { history } = this.props;
    const navigateParams = {
      route: Routes.DELIVERY_PLACES_NEW_MANUALLY,
    };

    navigate(history, navigateParams);
  };

  routeToDeliveryPlaceEdit = deliveryPlaceId => {
    const { history } = this.props;
    const navigateParams = {
      route: Routes.DELIVERY_PLACES_EDIT_MANUALLY,
      params: { deliveryPlaceId },
    };

    navigate(history, navigateParams);
  };

  render() {
    const { thereIsSheetProcessing, loading } = this.state;

    const {
      deliveryPlacesData,
      requestStatus,
      hasGroupAccessLevel,
    } = this.props;

    return (
      <DeliveryPlaces
        handleGoBack={this.handleGoBack}
        thereIsSheetProcessing={thereIsSheetProcessing}
        callback={this.getPlaces}
        deliveryPlacesData={deliveryPlacesData}
        requestStatus={requestStatus}
        fileInputRef={this.fileInputRef}
        onOpenFileDialogClick={this.openFileDialogHandler}
        onChange={this.onChange}
        hasGroupAccessLevel={hasGroupAccessLevel}
        routeToDeliveryPlacesNewManually={this.routeToDeliveryPlacesNewManually}
        routeToDeliveryPlaceEdit={this.routeToDeliveryPlaceEdit}
        loading={loading}
      />
    );
  }
}

DeliveryPlacesContainer.propTypes = {
  getDeliveryPlaces: func.isRequired,
  getUserAccessLevel: func.isRequired,
  deliveryPlacesData: shape({
    content: arrayOf(
      shape({
        placeId: string,
        address: string,
        firstContactName: string,
        firstContactDoc: string,
        firstContactDocType: string,
        secondContactName: string,
        secondContactDoc: string,
        secondContactDocType: string,
      }),
    ),
    totalItems: number,
  }),
  history: shape({}),
  requestStatus: string.isRequired,
  loggedUserId: string.isRequired,
  loggedUserCpf: string.isRequired,
  hasGroupAccessLevel: bool.isRequired,
  groupId: number.isRequired,
  getDeliveryPlaceNotifications: func.isRequired,
  openModal: func.isRequired,
  closeModal: func.isRequired,
  getOrderNotifications: func.isRequired,
  deliveryType: string.isRequired,
  selectedGroup: shape({}).isRequired,
};

DeliveryPlacesContainer.defaultProps = {
  deliveryPlacesData: {},
  history: {},
};

export const mapStateToProps = ({
  deliveryPlaces: {
    deliveryPlacesList: { data: deliveryPlacesData, error, requestStatus },
  },
  user: {
    profile: {
      data: { id: loggedUserId, cpf: loggedUserCpf },
    },
    accessLevel,
  },
  selectedCompanyTree: {
    selectedGroup: {
      id: groupId,
      params: { deliveryType },
    },
  },
  selectedCompanyTree: { selectedGroup },
}) => ({
  deliveryPlacesData,
  error,
  requestStatus,
  groupId,
  loggedUserId,
  loggedUserCpf,
  deliveryType,
  selectedGroup,
  hasGroupAccessLevel: accessLevel === userAccessLevel.GROUP,
});

export const mapDispatchToProps = {
  getDeliveryPlaces: deliveryPlacesActions.get,
  getDeliveryPlaceNotifications: deliveryPlacesActions.getNotifications,
  openModal: modalActions.OpenModal,
  getUserAccessLevel: getUserAccessLevelAction,
  closeModal: modalActions.CloseModal,
  getOrderNotifications: orderActions.getOrderNotifications,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DeliveryPlacesContainer);
