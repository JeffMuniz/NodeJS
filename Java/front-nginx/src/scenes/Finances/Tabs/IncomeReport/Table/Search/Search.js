import React, { PureComponent } from "react";
import { func } from "prop-types";

import { SvgIcon } from "@common";
import { toCNPJMask, toOnlyNumbers } from "@utils";

import {
  Container,
  Title,
  InputWrapper,
  StyledInput,
  StyledButton,
} from "./Search.styled";

class Search extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      value: "",
    };

    this.inputRef = React.createRef();
  }

  onInputChangeHandler = e =>
    this.setState({ value: toCNPJMask(toOnlyNumbers(e.target.value)) });

  onClickSearchHandler = () => {
    const { callback } = this.props;
    const { value } = this.state;
    callback(toOnlyNumbers(value));
  };

  render() {
    const { value } = this.state;

    return (
      <Container>
        <Title>Busca</Title>
        <InputWrapper>
          <StyledInput
            placeholder="Digite o cnpj"
            id="input_search_cnpj"
            inputRef={this.inputRef}
            onChange={this.onInputChangeHandler}
            value={value}
          />
          <StyledButton
            onClick={this.onClickSearchHandler}
            id="button_search_cnpj"
          >
            <SvgIcon name="search" size={22} />
          </StyledButton>
        </InputWrapper>
      </Container>
    );
  }
}

Search.propTypes = {
  callback: func.isRequired,
};

export default Search;
