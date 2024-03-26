import React, { Fragment, PureComponent } from "react";
import { func } from "prop-types";

import { Header, Title } from "../Request/Request.styled";
import { SubTitle } from "./Review.styles";
import ReviewForm from "./ReviewForm.container";

class Review extends PureComponent {
  componentDidMount() {
    document.getElementById("form-review-header-title").scrollIntoView();
  }
  render() {
    const { goBack, goBackToDetails } = this.props;
    return (
      <Fragment>
        <Header>
          <Title id="form-review-header-title">Valores</Title>
          <SubTitle id="form-review-header-subtitle">
            Se for realizar vários valores iguais, insira nos campos abaixo. Se
            forem valores diferentes, pode inserir diretamente na tabela
            seguinte:
          </SubTitle>
        </Header>
        <ReviewForm goBack={goBack} goBackDetails={goBackToDetails} />
      </Fragment>
    );
  }
}

Review.propTypes = {
  goBack: func.isRequired,
  goBackToDetails: func.isRequired,
};

export default Review;
