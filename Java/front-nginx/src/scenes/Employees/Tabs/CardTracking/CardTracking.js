import React, { Component, Fragment } from "react";
import { func, string, bool, arrayOf, shape, oneOf } from "prop-types";

import { Row, Col } from "react-styled-flexboxgrid";

import lottie from "lottie-web";

import { AutoSuggestInput } from "@base";

import { highlightCPF } from "@utils";
import { requestStatus } from "@enums";

import * as animationData from "src/base/WithPagination/animation.json";

import CardTrackingList from "./CardTrackingList/CardTrackingList";
import CardTrackingNotFound from "./CardTrackingNotFound/CardTrackingNotFound";
import {
  Container,
  Text,
  Title,
  SuggestionItemEmployeeCPF,
  SuggestionItemEmployeeName,
  LoadingWrapper,
  Loading,
} from "./CardTracking.styles";

const statuses = Object.values(requestStatus);

export const renderSuggestion = (suggestion, { query }) => (
  <Fragment>
    <SuggestionItemEmployeeCPF
      dangerouslySetInnerHTML={{
        __html: highlightCPF(suggestion.cpf, query),
      }}
    />
    <SuggestionItemEmployeeName>{suggestion.name}</SuggestionItemEmployeeName>
  </Fragment>
);

export class CardTracking extends Component {
  state = {
    animationStarted: false,
  };

  componentDidUpdate = () => {
    const { cardsRequestStatus } = this.props;
    const { animationStarted } = this.state;

    if (cardsRequestStatus === requestStatus.loading && !animationStarted) {
      lottie.loadAnimation({
        container: this.animationRef,
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData,
      });
      this.setState({ animationStarted: true }); //eslint-disable-line
    }
  };

  render() {
    const {
      suggestions,
      onSuggestionsFetchRequested,
      onSuggestionsClearRequested,
      getSuggestionValue,
      onSuggestionSelected,
      inputProps: { onChange, value },
      error,
      employeeSelected,
      vouchers,
      cardsNotFound,
      cardsRequestStatus,
    } = this.props;

    return (
      <Container>
        <Row>
          <Col xs={12}>
            <Text>
              Aqui você pode acompanhar o status de uma solicitação de novo
              cartão fazendo uma busca.
            </Text>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Title>Informe o CPF do funcionário</Title>
          </Col>
        </Row>
        <Row>
          <AutoSuggestInput
            suggestions={suggestions}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            onSuggestionSelected={onSuggestionSelected}
            inputProps={{
              id: "cpf-suggestion",
              placeholder: "111.22remoteShellVulner33-00",
              value,
              onChange,
            }}
            maxLength={14}
            xs={12}
            md={4}
            error={error}
          />
        </Row>
        <Row>
          {cardsNotFound && (
            <Container>
              <CardTrackingNotFound cpf={employeeSelected} />
            </Container>
          )}
        </Row>
        {!cardsNotFound && !error && vouchers && vouchers.length > 0 && (
          <Row>
            <Col xs={12}>
              <CardTrackingList vouchers={vouchers} />
            </Col>
          </Row>
        )}
        <Row>
          <Col xs={12}>
            <LoadingWrapper
              status={cardsRequestStatus === requestStatus.loading}
            >
              <Loading
                id="animation"
                innerRef={ref => {
                  this.animationRef = ref;
                }}
                status={cardsRequestStatus === requestStatus.loading}
              />
            </LoadingWrapper>
          </Col>
        </Row>
      </Container>
    );
  }
}

CardTracking.propTypes = {
  suggestions: arrayOf(shape()),
  vouchers: arrayOf(shape()),
  inputProps: shape({
    value: string,
    onChange: func,
  }),
  onSuggestionsFetchRequested: func,
  onSuggestionsClearRequested: func,
  getSuggestionValue: func,
  onSuggestionSelected: func,
  error: string,
  employeeSelected: string,
  cardsNotFound: bool,
  cardsRequestStatus: oneOf(statuses),
};

CardTracking.defaultProps = {
  suggestions: [],
  vouchers: [],
  inputProps: {
    value: "",
    onChange: () => null,
  },
  onSuggestionsFetchRequested: () => null,
  onSuggestionsClearRequested: () => null,
  getSuggestionValue: () => null,
  onSuggestionSelected: () => null,
  error: null,
  employeeSelected: null,
  cardsNotFound: false,
  cardsRequestStatus: requestStatus.success,
};

export default CardTracking;
