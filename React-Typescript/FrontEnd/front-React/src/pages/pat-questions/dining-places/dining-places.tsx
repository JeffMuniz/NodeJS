
import { FC } from 'react';
import { useFormikContext } from 'formik';
import {
 DPPageSubtitle, RadioInput, Wrapper,
} from './dining-places.styles';

type FormValues = PATQuestionsPage.Form;

const DiningPlaces: FC = () => {

  const { handleChange } = useFormikContext<FormValues>();

  return (
    <Wrapper>
      <DPPageSubtitle>
        qual é o número de refeições que serve diariamente?
      </DPPageSubtitle>
      <RadioInput
        label='1 - 30'
        name='diningPlaces'
        id='dining-places-1'
        onChange={handleChange}
      />
      <RadioInput
        label='31 - 60'
        name='diningPlaces'
        id='dining-places-2'
        onChange={handleChange}
      />
      <RadioInput
        label='61 - 99'
        name='diningPlaces'
        id='dining-places-3'
        onChange={handleChange}
      />
      <RadioInput
        label='100 ou +'
        name='diningPlaces'
        id='dining-places-4'
        onChange={handleChange}
      />
    </Wrapper>
  );
};

export default DiningPlaces;
