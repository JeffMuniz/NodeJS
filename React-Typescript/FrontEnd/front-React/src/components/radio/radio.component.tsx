
import { FC } from 'react';
import {
 Circle, HiddenRadio, InnerCircle, Label, Wrapper,
} from './radio.styles';

const Radio: FC<Radio.Props> = ({
  className,
  id,
  label,
  name,
  onChange,
  onClick,
  value,
}) => (
  <Wrapper className={className}>
    <HiddenRadio
      id={id}
      name={name}
      onChange={onChange}
      onClick={onClick}
      value={value}
    />
    <Circle>
      <InnerCircle />
    </Circle>
    <Label htmlFor={id}>
      {label}
    </Label>
  </Wrapper>
);

export default Radio;
