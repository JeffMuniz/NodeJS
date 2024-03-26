import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { func, shape } from "prop-types";
import { If } from "@utils";
import { Loading } from "@base";
import { requestStatus as status } from "@enums";

import { Header, Title, Subtitle, LoadingWrapper } from "./Request.styled";
import RequestForm from "./RequestForm.container";

class Chargeback extends PureComponent {
  render() {
    const {
      employee: { requestStatus },
    } = this.props;
    return (
      <div>
        <If test={requestStatus === status.loading}>
          <LoadingWrapper>
            <Loading loading />
          </LoadingWrapper>
        </If>
        <Header>
          <Title id="form-request-header-title">Nova solicitação</Title>
          <Subtitle id="form-request-header-subtitle">
            Selecione o motivo do estorno, os CPFs dos funcionários e nos
            próximos passos poderá escolher tipo de macefício e os valores.
          </Subtitle>
        </Header>
        <RequestForm {...this.props} />
      </div>
    );
  }
}

Chargeback.propTypes = {
  goForward: func.isRequired,
  goBack: func.isRequired,
  employee: shape({}).isRequired,
};

const mapStateToProps = ({ chargeBack }) => ({
  employee: chargeBack.chargebackEmployee,
});

export default connect(mapStateToProps)(Chargeback);
