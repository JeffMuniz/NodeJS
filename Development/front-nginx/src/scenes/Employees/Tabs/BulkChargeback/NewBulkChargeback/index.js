import React, { PureComponent } from "react";
import { func } from "prop-types";
import { Request, Review, Validation } from "./Steps";

const steps = {
  0: Request,
  1: Validation,
  2: Review,
};

const totalItems = Object.keys(steps).length;

class NewBulkChargeback extends PureComponent {
  state = {
    current: 0,
  };

  onClickGoForwardHandler = () => {
    const { current } = this.state;

    if (current === totalItems - 1) {
      throw new Error(
        "The last step has been reached, handle the go forward button inside the component`s container",
      );
    }

    this.setState({ current: current + 1 });
  };

  onClickGoBackHandler = () => {
    const { current } = this.state;
    if (current < 1) {
      throw new Error(
        "The first step has been reached, handle the go back button inside the component`s container",
      );
    }

    this.setState({ current: current - 1 });
  };

  render() {
    const { current } = this.state;
    const { onClickBack } = this.props;
    const Component = steps[current];

    return (
      <Component
        goForward={this.onClickGoForwardHandler}
        goBack={this.onClickGoBackHandler}
        goBackToDetails={onClickBack}
      />
    );
  }
}

NewBulkChargeback.propTypes = {
  onClickBack: func.isRequired,
};

export default NewBulkChargeback;
