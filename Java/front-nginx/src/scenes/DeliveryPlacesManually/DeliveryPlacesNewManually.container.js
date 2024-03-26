import React, { Component } from "react";
import { connect } from "react-redux";
import { func, number, string } from "prop-types";

import navigate from "src/routes/navigate";
import { Routes } from "src/routes/consts";

import { ContainerWrapper } from "@base";
import { ufList } from "@enums";
import {
  toOnlyNumbers,
  toOnlyLettersAndNumbers,
  removeSomeCharacters,
} from "@utils/stringHelper";

import { getZipCode } from "src/api/zipCode/zipCode";
import { postDeliveryPlaceManually } from "src/api/deliveryPlaces/deliveryPlaces";
import { showToast as showToastAction } from "src/common/Toast/redux/actions/toast";

import FormWrapper from "src/modules/Form/Form";
import FormSchema from "./DeliveryPlacesManually.schema";
import DeliveryPlacesManually from "./DeliveryPlacesManually";

import { Separator } from "./DeliveryPlacesManually.styles";

export class DeliveryPlacesManuallyContainer extends Component {
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
      isNewDeliveryPlace: true,
    };
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
    const { loggedUserId, showToast, companyGroupId } = this.props;

    const initialValues = {
      ...values,
      deliveryName: toOnlyLettersAndNumbers(values.deliveryName),
      address: removeSomeCharacters(values.address, true),
      number: toOnlyNumbers(values.number),
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
      await postDeliveryPlaceManually(
        initialValues,
        companyGroupId,
        loggedUserId,
      );

      this.routeToDeliveryPlacesList();

      showToast({
        id: "success-post-delivery-place-id",
        label: "Novo Local de Entrega criado com sucesso!",
      });
    } catch (err) {
      showToast({
        id: "error-post-delivery-place-id",
        label: "Ocorreu um erro ao cadastrar o local de entrega!",
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
      isNewDeliveryPlace,
    } = this.state;

    return (
      <ContainerWrapper
        title="Cadastrar Local de Entrega"
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
              isNewDeliveryPlace={isNewDeliveryPlace}
            />
          )}
        />
      </ContainerWrapper>
    );
  }
}

DeliveryPlacesManuallyContainer.propTypes = {
  loggedUserId: string.isRequired,
  companyGroupId: number.isRequired,
  showToast: func,
};

DeliveryPlacesManuallyContainer.defaultProps = {
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
)(DeliveryPlacesManuallyContainer);
