import React, { Component } from "react";
import { string, func, shape, arrayOf } from "prop-types";

import { blue } from "@colors";
import { If } from "@utils";

import {
  CustomInputWrap,
  Input,
  SelectWrap,
  SelectOptions,
  StyledOption,
  Icon,
  IconWrapper,
  SelectIcon,
} from "./SearchableInput.styles";

let typingTimer;
const doneTypingInterval = 2000;

class CustomInput extends Component {
  constructor(props) {
    super(props);

    const clickable = props.fieldsToFilterBy.length !== 1;

    this.state = {
      inputSearch: "",
      showInputOptions: false,
      clickable,
    };
    this.triggerRef = React.createRef();
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleESCFunction, false);
    document.addEventListener("click", this.handleClickOutSideSelect, false);

    const myInput = document.getElementById("searchable_input_id");

    myInput.addEventListener("keyup", () => {
      clearTimeout(typingTimer);
      typingTimer = setTimeout(
        this.handleInputChangeCallback,
        doneTypingInterval,
      );
    });
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleESCFunction, false);
    document.removeEventListener("click", this.handleClickOutSideSelect, false);
  }

  handleESCFunction = event => {
    const { showInputOptions } = this.state;
    if (event.keyCode === 27 && showInputOptions) {
      this.handleOptionsVisibilityChanges();
    }
  };

  handleClickOutSideSelect = event => {
    const { showInputOptions } = this.state;
    const { id } = event.target.parentNode;
    if (!event.target.dataset.customselect && showInputOptions) {
      this.handleOptionsVisibilityChanges();
    }
    if (id === "custom-select" && showInputOptions) {
      this.handleOptionsVisibilityChanges();
    }
  };

  handleInputChange = event => {
    const inputSearch = event.target.value;

    this.setState({ inputSearch });
  };

  handleInputChangeCallback = () => {
    const { onChange } = this.props;
    const { inputSearch } = this.state;

    onChange(inputSearch);
  };

  handleOptionsVisibilityChanges = () => {
    const { showInputOptions } = this.state;
    this.setState({ showInputOptions: !showInputOptions });
  };

  handleFilterByChanges = filterBy => () => {
    const { showInputOptions } = this.state;
    const { onFilterChange } = this.props;
    this.setState(
      {
        showInputOptions: !showInputOptions,
        inputSearch: "",
      },
      () => onFilterChange(filterBy),
    );
  };

  render() {
    const { clickable, inputSearch, showInputOptions } = this.state;
    const {
      fieldsToFilterBy,
      marginRight,
      filterBy,
      id,
      position,
      onInput,
    } = this.props;

    return (
      <CustomInputWrap marginRight={marginRight} position={position}>
        <IconWrapper>
          <Icon name="search" />
        </IconWrapper>
        {filterBy.mask ? (
          <Input
            id={id}
            onChange={event =>
              event.target.value !== inputSearch &&
              this.handleInputChange(event)
            }
            onInput={onInput}
            value={inputSearch}
            placeholder="Buscar pelo(a)"
            maskType={filterBy.mask}
            maskChar=""
            hasIcon
          />
        ) : (
          <Input
            id={id}
            onChange={this.handleInputChange}
            onInput={onInput}
            value={inputSearch}
            placeholder="Buscar por"
            hasIcon
          />
        )}
        <SelectWrap
          onClick={this.handleOptionsVisibilityChanges}
          data-customselect="custom-select"
          id="pagination-custom-select"
          cursorPointer={clickable}
        >
          {filterBy.description}
          <SelectIcon
            innerRef={this.triggerRef}
            id="custom-select"
            onClick={event => this.handleOptionsVisibilityChanges(event)}
          >
            <If test={clickable}>
              <Icon name="arrowDown" fill={blue} triggerRef={this.triggerRef} />
            </If>
          </SelectIcon>
        </SelectWrap>
        <If test={showInputOptions && clickable}>
          <SelectOptions>
            {fieldsToFilterBy.map(option => (
              <StyledOption
                active={option.key === filterBy.key}
                key={option.key}
                id={`custom-select-option-${option.key}`}
                onClick={this.handleFilterByChanges(option)}
              >
                {option.optionDescription || option.description}
              </StyledOption>
            ))}
          </SelectOptions>
        </If>
      </CustomInputWrap>
    );
  }
}

CustomInput.propTypes = {
  fieldsToFilterBy: arrayOf(
    shape({
      key: string.isRequired,
      description: string.isRequired,
      optionDescription: string,
    }),
  ).isRequired,
  onChange: func.isRequired,
  onFilterChange: func,
  marginRight: string,
  filterBy: shape({}),
  id: string.isRequired,
  position: string,
  onInput: func,
};

CustomInput.defaultProps = {
  onFilterChange: () => null,
  marginRight: "0",
  filterBy: {},
  position: "",
  onInput: () => null,
};

export default CustomInput;
