import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import get from "lodash/get";
import { RadioButton } from "@common";

import { Section, Title } from "./CreditAnticipation.styled";

const CreditAnticipation = ({
  creditAnticipation,
  hasOrderCreditAnticipation,
  onChangeOption,
  anticipationTax,
  isPrepaid,
}) => (
  <Section>
    {creditAnticipation.canCreditAnticipation ? (
      <React.Fragment>
        <Title>
          Gostaria de antecipar os créditos desse pedido
          {isPrepaid ? "" : " para hoje"}?
        </Title>
        <RadioButton
          id="credit-antecipation-radio-button"
          labelBefore={false}
          name="hasOrderCreditAnticipation"
          onChange={onChangeOption}
          setFieldValue={() => null}
          setFieldTouched={() => null}
          selectedValue={hasOrderCreditAnticipation}
          values={{}}
          options={[
            {
              label: "Sim",
              value: true,
              id: "sim",
            },
            {
              label: "Não",
              value: false,
              id: "false",
            },
          ]}
        />
        <small>A taxa de antecipação é de {anticipationTax}</small>
      </React.Fragment>
    ) : (
      <React.Fragment>
        <Title>Pedido não elegível para antecipação</Title>
        <p>{creditAnticipation.anticipationFeedbackMessage}</p>
      </React.Fragment>
    )}
  </Section>
);

CreditAnticipation.propTypes = {
  creditAnticipation: PropTypes.shape({
    canCreditAnticipation: PropTypes.bool,
    anticipationFeedbackMessage: PropTypes.string,
  }),
  hasOrderCreditAnticipation: PropTypes.bool.isRequired,
  onChangeOption: PropTypes.func.isRequired,
  anticipationTax: PropTypes.string,
  isPrepaid: PropTypes.bool,
};
CreditAnticipation.defaultProps = {
  creditAnticipation: {
    canCreditAnticipation: false,
    anticipationFeedbackMessage: "",
  },
  anticipationTax: "R$ 0,00",
  isPrepaid: false,
};

const mapStateToProps = ({ selectedCompanyTree }) => ({
  paymentType: get(selectedCompanyTree, "selectedGroup.params.paymentType"),
  isPrepaid: get(selectedCompanyTree, "selectedGroup.params.isPrepaid"),
});

export default connect(mapStateToProps)(withRouter(CreditAnticipation));
