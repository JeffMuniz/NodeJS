import React, { PureComponent } from "react";

import ChargebackContainer from "./ChargeBack.container";
import NewChargeback from "./NewBulkChargeback";
import ChargeDetails from "./ChargeBackDetails/ChargeBackDetails.container";

const steps = {
  0: ChargebackContainer,
  1: NewChargeback,
  2: ChargeDetails,
};

class Chargeback extends PureComponent {
  state = {
    current: 0,
  };

  onClickNewChargebackHandler = () =>
    this.setState(({ current }) => ({ current: current + 1 }));

  onBackHandler = () => this.setState({ current: 0 });

  OnClickChargeBackDetailsHandler = () =>
    this.setState(({ current }) => ({ current: current + 2 }));

  OnClickBackDetails = () => {
    const { current } = this.state;

    if (current < 0) {
      throw new Error(
        "The first step has been reached, handle the go back button inside the component`s container",
      );
    }

    this.setState({ current: current - 2 });
  };

  render() {
    const { current } = this.state;
    const Component = steps[current];

    return (
      <Component
        onClickNewChargeback={this.onClickNewChargebackHandler}
        onClickBack={this.onBackHandler}
        goDetails={this.OnClickChargeBackDetailsHandler}
        goBackDetails={this.OnClickBackDetails}
      />
    );
  }
}

export default Chargeback;
