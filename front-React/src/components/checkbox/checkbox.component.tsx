
import { FC } from 'react';
import {
  CheckMark,
  HiddenCheckbox,
 InnerSquare, Label, Square,
 Wrapper,
} from './checkbox.component.styles';

const Checkbox: FC<Checkbox.Props> = ({
  id,
  label,
  onChange,
  name,
  value,
  className,
  children,
}) => (
  <Wrapper className={className}>
    <HiddenCheckbox
      id={id}
      name={name}
      onChange={onChange}
    />
    <Square>
      <InnerSquare>
        <CheckMark />
      </InnerSquare>
    </Square>
      {children || (
        <Label htmlFor={id}>
          { label }
        </Label>
      )}
  </Wrapper>
);

export default Checkbox;
