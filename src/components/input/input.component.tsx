
import { FC } from 'react';
import {
 EditIcon, ErrorMessage, InlineWrapper, Label, TextInput, Wrapper,
} from './input.component.styles';

const Input: FC<Input.Props> = ({
  className,
  errorMessage,
  id,
  label,
  name,
  onBlur,
  onChange = () => { },
  onFocus,
  placeholder,
  showEditIndicator,
  value,
}) => (
  <Wrapper className={className}>
    { label && (
      <Label htmlFor={id}>
        { label }
      </Label>
    ) }
    <InlineWrapper>
      <TextInput
        id={id}
        name={name || id}
        onBlur={onBlur}
        onChange={onChange}
        onFocus={onFocus}
        placeholder={placeholder}
        value={value}
      />
      { showEditIndicator && <EditIcon /> }
    </InlineWrapper>
    <ErrorMessage>
      { errorMessage }
    </ErrorMessage>
  </Wrapper>
);

export default Input;
