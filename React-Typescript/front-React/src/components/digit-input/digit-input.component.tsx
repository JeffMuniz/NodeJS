
import {
 ChangeEvent, FC, useEffect, useState,
} from 'react';
import { Input, Wrapper } from './digit-input.component.styles';

const DigitInput: FC<DigitInput.Props> = ({
  className,
  digits,
  onChange,
}) => {

  const digitsToArray = (size: number) => new Array(size).fill('');

  const [ state, setState ] = useState<DigitInput.State>({
    values: digitsToArray(digits),
  });

  useEffect(() => {
    setState(prev => ({
      ...prev,
      values: digitsToArray(digits),
    }));
  }, [ digits ]);

  const handleChange = ({ event, index }: {
    event: ChangeEvent<HTMLInputElement>;
    index: number;
  }) => {
    const { value, nextSibling } = event.target as HTMLInputElement;

    const values = [ ...state.values ];
    values[index] = value;

    setState(prev => ({
      ...prev,
      values,
    }));

    if(value.length === 1) {
      if(nextSibling) {
        (nextSibling as HTMLInputElement)?.focus();
      } else {
        event.target.blur();
      }
    }

    onChange({ event, value: values.join('') });
  };

  return (
    <Wrapper className={className}>
      { state.values.map((v, index) => (
        <Input
          key={index}
          value={v}
          onChange={event => handleChange({ event, index })}
        />
      )) }
    </Wrapper>
  );
};

export default DigitInput;
