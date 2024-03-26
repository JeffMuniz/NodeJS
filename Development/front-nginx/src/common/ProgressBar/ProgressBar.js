import React, { Component } from "react";
import PropTypes from "prop-types";
import { Row, Col } from "react-styled-flexboxgrid";

import { ProgressSteps } from "@enums";

import navigate from "src/routes/navigate";
import { Wrapper, Item, Bubble } from "./ProgressBar.styles";

class ProgressBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentStep: this.getCurrentStep(props.navigator.location),
    };
  }

  getCurrentStep = location =>
    ProgressSteps.find(step => step.route === location.pathname);

  handleItemClick = step => {
    const { navigator } = this.props;
    this.setState({ currentStep: step }, () =>
      navigate(navigator, { ...step }),
    );
  };

  render() {
    const { currentStep } = this.state;
    return (
      <Row>
        <Col xs={12}>
          <Wrapper>
            {ProgressSteps.map(step => (
              <Item
                key={step.name.replace(/\s/g, "X")}
                onClick={() => this.handleItemClick(step)}
                complete={step.position <= currentStep.position}
              >
                <span>{step.name}</span>
                <Bubble complete={step.position <= currentStep.position} />
              </Item>
            ))}
          </Wrapper>
        </Col>
      </Row>
    );
  }
}

ProgressBar.propTypes = {
  navigator: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }).isRequired,
};

export default ProgressBar;
