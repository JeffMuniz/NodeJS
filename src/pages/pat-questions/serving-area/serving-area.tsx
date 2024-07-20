
import { FC } from 'react';
import { useFormikContext } from 'formik';
import {
  RadioInput, SAPageSubtitle, Wrapper,
} from './serving-area.styles';

type FormValues = PATQuestionsPage.Form;

const ServingArea: FC = () => {

  const { handleChange } = useFormikContext<FormValues>();

  return (
    <Wrapper>
      <SAPageSubtitle>
        qual é a área de atendimento?
      </SAPageSubtitle>
      <RadioInput
        id='serving-area-1'
        label='até 50m2'
        name='servingArea'
        onChange={handleChange}
      />
      <RadioInput
        id='serving-area-2'
        label='51m2 - 100m2'
        name='servingArea'
        onChange={handleChange}
      />
      <RadioInput
        id='serving-area-3'
        label='101m2 - 499m2'
        name='servingArea'
        onChange={handleChange}
      />
      <RadioInput
        id='serving-area-4'
        label='500m2 ou +'
        name='servingArea'
        onChange={handleChange}
      />
    </Wrapper>
  );
};

export default ServingArea;
