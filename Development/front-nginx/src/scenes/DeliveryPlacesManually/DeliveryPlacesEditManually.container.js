import React, { Component } from "react";
import { connect } from "react-redux";
import { func, number, string, shape } from "prop-types";

import navigate from "src/routes/navigate";
import { Routes } from "src/routes/consts";

import { ContainerWrapper } from "@base";
import { ufList } from "@enums";
import {
  toOnlyNumbers,
  toOnlyLettersAndNumbers,
  removeSomeCharacters,
} from "@utils/stringHelper";

import {
  getDeliveryPlaceDetail,
  putDeliveryPlaceManually,
} from "src/api/deliveryPlaces/deliveryPlaces";
import { getZipCode } from "src/api/zipCode/zipCode";

import { showToast as showToastAction } from "src/common/Toast/redux/actions/toast";

import FormWrapper from "src/modules/Form/Form";
import FormSchema from "./DeliveryPlacesManually.schema";
import DeliveryPlacesManually from "./DeliveryPlacesManually";

import { Separator } from "./DeliveryPlacesManually.styles";

export class DeliveryPlacesEditContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      initialValues: {
        deliveryName: "",
        zipcode: "",
        address: "",
        number: "",
        complement: "",
        neighborhood: "",
        city: "",
        state: "",
        firstPersonName: "",
        firstRg: "",
        firstPhone: "",
        secondPersonName: "",
        secondRg: "",
        secondPhone: "",
      },
      fromApi: {
        address: "",
        neighborhood: "",
        city: "",
        state: "",
        number: "",
      },
      isInitialValid: false,
      disabledInput: true,
      invalidZipCode: false,
      errorGetZipCode: false,
      loading: false,
    };
  }

  componentDidMount() {
    this.getDeliveryPlace();
  }

  onZipCodeChange = async (event, values) => {
    const {
      target: { value: zipcode },
    } = event;
    const {
      initialValues: { zipcode: zipcodeState },
    } = this.state;

    if (!zipcode || zipcode.length < 9 || zipcode === zipcodeState) return;

    this.setState({ initialValues: values });

    const {
      data: { address, city, neighborhood, state },
      status,
      invalidZipCode,
    } = await getZipCode(zipcode);

    let selectedStateFromApi = "";

    ufList.forEach(element => {
      if (element.name === state) {
        selectedStateFromApi = {
          id: element.id,
          name: element.name,
        };
      }
    });

    this.setState(prevState => ({
      ...prevState,
      initialValues: {
        ...prevState.initialValues,
        zipcode,
        address,
        neighborhood,
        city,
        state: selectedStateFromApi,
        number: "",
        complement: "",
      },
      fromApi: {
        address,
        neighborhood,
        city,
        state: selectedStateFromApi,
        number: "",
      },
      invalidZipCode,
      firstRender: false,
      disabledInput: false,
    }));

    if (status === 200) {
      this.setState({
        errorGetZipCode: false,
      });
    } else {
      this.setState({
        errorGetZipCode: true,
      });
    }
  };

  getDeliveryPlace = async () => {
    const {
      match: {
        params: { deliveryPlaceId },
      },
      showToast,
    } = this.props;

    this.setState({ loading: true });

    try {
      const initialValues = await getDeliveryPlaceDetail(deliveryPlaceId);
      const { uf, zipcode } = initialValues;

      const { invalidZipCode } = await getZipCode(zipcode);

      let selectedStateFromApi = "";

      ufList.forEach(element => {
        if (element.name === uf) {
          selectedStateFromApi = {
            id: element.id,
            name: element.name,
          };
        }
      });

      this.setState({
        initialValues: {
          ...initialValues,
          state: selectedStateFromApi,
        },
        disabledInput: !invalidZipCode,
      });
    } catch (err) {
      showToast({
        id: "error-get-delivery-place-id",
        label: "Ocorreu um erro ao obter os dados do local de entrega!",
      });
    } finally {
      this.setState({ loading: false });
    }
  };

  routeToDeliveryPlacesList = () => {
    const { history } = this.props;
    const navigateParams = {
      route: Routes.DELIVERY_PLACES,
    };

    navigate(history, navigateParams);
  };

  handleStateChange = (selectedValue, values) => {
    this.setState({
      initialValues: {
        ...values,
        state: selectedValue,
      },
    });
  };

  handleGoBack = () => {
    const {
      history: { goBack },
    } = this.props;

    goBack();
  };

  handleSubmit = async values => {
    const {
      match: {
        params: { deliveryPlaceId },
      },
      companyGroupId,
      loggedUserId,
      showToast,
    } = this.props;

    const initialValues = {
      ...values,
      deliveryName: toOnlyLettersAndNumbers(values.deliveryName),
      address: removeSomeCharacters(values.address, true),
      number: toOnlyNumbers(values.number, true),
      complement: toOnlyLettersAndNumbers(values.complement, true),
      neighborhood: removeSomeCharacters(values.neighborhood, true),
      city: removeSomeCharacters(values.city, false),
      firstPersonName: removeSomeCharacters(values.firstPersonName, false),
      firstRg: toOnlyNumbers(values.firstRg),
      secondPersonName: removeSomeCharacters(values.secondPersonName, false),
      secondRg: toOnlyNumbers(values.secondRg),
    };

    this.setState({
      initialValues,
      loading: true,
    });

    try {
      await putDeliveryPlaceManually(
        initialValues,
        companyGroupId,
        loggedUserId,
        deliveryPlaceId,
      );

      this.routeToDeliveryPlacesList();

      showToast({
        id: "success-put-delivery-place-id",
        label: `Local de Entrega ${values.deliveryName} alterado com sucesso!`,
      });
    } catch (err) {
      showToast({
        id: "error-put-delivery-place-id",
        label: "Ocorreu um erro ao atualizar os dados do local de entrega!",
      });
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const {
      initialValues,
      isInitialValid,
      disabledInput,
      errorGetZipCode,
      invalidZipCode,
      fromApi,
      loading,
    } = this.state;
    const { deliveryName } = initialValues;

    return (
      <ContainerWrapper
        title={`Editar Filial ${deliveryName}`}
        showBackIcon
        headerClickHandler={this.handleGoBack}
      >
        <Separator marginTop="0" marginBottom="15px" />
        <FormWrapper
          enableReinitialize
          initialValues={initialValues}
          validationSchema={FormSchema}
          onSubmit={this.handleSubmit}
          isInitialValid={isInitialValid}
          render={props => (
            <DeliveryPlacesManually
              {...props}
              handleGoBack={this.handleGoBack}
              onZipCodeChange={this.onZipCodeChange}
              disabledInput={disabledInput}
              errorGetZipCode={errorGetZipCode}
              fromApi={fromApi}
              invalidZipCode={invalidZipCode}
              handleStateChange={this.handleStateChange}
              loading={loading}
            />
          )}
        />
      </ContainerWrapper>
    );
  }
}

DeliveryPlacesEditContainer.propTypes = {
  match: shape({
    params: shape({
      deliveryPlaceId: string,
    }),
  }).isRequired,
  loggedUserId: string.isRequired,
  companyGroupId: number.isRequired,
  showToast: func,
};

DeliveryPlacesEditContainer.defaultProps = {
  showToast: () => null,
};

const mapDispatchToProps = {
  showToast: showToastAction,
};

const mapStateToProps = ({
  user: {
    profile: {
      data: { id: loggedUserId },
    },
  },
  selectedCompanyTree: {
    selectedGroup: { id: companyGroupId },
  },
}) => ({
  loggedUserId,
  companyGroupId,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DeliveryPlacesEditContainer);
