import React, { Fragment, PureComponent } from "react";
import { connect } from "react-redux";
import { func, shape } from "prop-types";

import { Header, Title } from "../Request/Request.styled";
import ValidationForm from "./ValidationForm.container";

class Validation extends PureComponent {
  componentDidMount() {
    document.getElementById("form-validation-header-title").scrollIntoView();
  }

  render() {
    const { goBack, goBackToDetails } = this.props;

    return (
      <Fragment>
        <Header>
          <Title id="form-validation-header-title">Verificação CPF</Title>
        </Header>
        <ValidationForm
          goBack={goBack}
          goBackDetails={goBackToDetails}
          {...this.props}
        />
      </Fragment>
    );
  }
}

Validation.propTypes = {
  goForward: func.isRequired,
  goBack: func.isRequired,
  goBackToDetails: func.isRequired,
  employee: shape({}).isRequired,
};

const mapStateToProps = ({ chargeBack }) => ({
  employee: chargeBack.chargebackEmployee,
});

export default connect(mapStateToProps)(Validation);
