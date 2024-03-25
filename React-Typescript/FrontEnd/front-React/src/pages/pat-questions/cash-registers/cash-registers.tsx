
import { FC } from 'react';
import { useFormikContext } from 'formik';
import {
 CRPageSubtitle, RadioInput, Wrapper,
} from './cash-registers.styles';

type FormValues = PATQuestionsPage.Form;

const CashRegisters: FC = () => {

  const { handleChange } = useFormikContext<FormValues>();

  return (
    <Wrapper>
      <CRPageSubtitle>
        quantas caixas registradoras o estabelecimento possui?
      </CRPageSubtitle>
      <RadioInput
        label='1 - 30'
        name='cashRegisters'
        id='cash-registers-1'
        onChange={handleChange}
      />
      <RadioInput
        label='31 - 60'
        name='cashRegisters'
        id='cash-registers-2'
        onChange={handleChange}
      />
      <RadioInput
        label='61 - 99'
        name='cashRegisters'
        id='cash-registers-3'
        onChange={handleChange}
      />
      <RadioInput
        label='100 ou +'
        name='cashRegisters'
        id='cash-registers-4'
        onChange={handleChange}
      />
    </Wrapper>
  );
};

export default CashRegisters;
