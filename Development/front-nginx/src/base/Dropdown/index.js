import React, { Component } from "react";
import PropTypes from "prop-types";
import { ClickOutsideListener } from "@common";
import { If } from "@utils";
import { IconDots } from "@assets";
import { blue } from "@colors";
import {
  ActionWrapper,
  DropdownContainer,
  OptionsContainer,
  SelectOptions,
  StyledOption,
} from "./styles";

class Dropdown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showOptions: false,
    };

    this.triggerRef = React.createRef();
  }

  handleVisibilityDropdown = () => {
    const { showOptions } = this.state;
    this.setState({ showOptions: !showOptions });
  };

  handleForClickOption = option => {
    const { showOptions } = this.state;
    const { onClickOption } = this.props;

    this.setState({
      showOptions: !showOptions,
    });

    onClickOption(option);
  };

  render() {
    const {
      options,
      optionLabelProperty,
      optionsWidth,
      actionComponent,
    } = this.props;

    const { showOptions } = this.state;

    return (
      <DropdownContainer>
        <ActionWrapper onClick={this.handleVisibilityDropdown}>
          {actionComponent()}
        </ActionWrapper>
        <If test={showOptions}>
          <ClickOutsideListener
            id="outside_listener_generic_dropdown"
            handleClickOutside={this.handleVisibilityDropdown}
            isListening={showOptions}
            triggerRef={this.triggerRef}
          >
            <OptionsContainer>
              <SelectOptions optionsWidth={optionsWidth}>
                {options.map((option, index) => (
                  <StyledOption
                    key={index}
                    id={`custom-select-option-${option.key}`}
                    onClick={event => this.handleForClickOption(option, event)}
                  >
                    {option[optionLabelProperty]}
                  </StyledOption>
                ))}
              </SelectOptions>
            </OptionsContainer>
          </ClickOutsideListener>
        </If>
      </DropdownContainer>
    );
  }
}

Dropdown.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  optionLabelProperty: PropTypes.string.isRequired,
  onClickOption: PropTypes.func.isRequired,
  optionsWidth: PropTypes.string,
  actionComponent: PropTypes.func,
};

Dropdown.defaultProps = {
  optionsWidth: "",
  actionComponent: () => <IconDots fill={blue} />,
};

export default Dropdown;
