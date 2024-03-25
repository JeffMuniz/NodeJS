
import { FC } from 'react';
import { useFormikContext } from 'formik';
import {
 DSPageSubtitle, RadioInput, Wrapper,
} from './daily-servings.styles';

type FormValues = PATQuestionsPage.Form;

const DailyServings: FC = () => {

  const { handleChange } = useFormikContext<FormValues>();

  return (
    <Wrapper>
      <DSPageSubtitle>
        qual é o número de refeições que serve diariamente?
      </DSPageSubtitle>
      <RadioInput
        id='daily-servings-1'
        label='até 100'
        name='dailyServings'
        onChange={handleChange}
      />
      <RadioInput
        id='daily-servings-2'
        label='101 - 200'
        name='dailyServings'
        onChange={handleChange}
      />
      <RadioInput
        id='daily-servings-3'
        label='201 - 299'
        name='dailyServings'
        onChange={handleChange}
      />
      <RadioInput
        id='daily-servings-4'
        label='300 ou +'
        name='dailyServings'
        onChange={handleChange}
      />
    </Wrapper>
  );
};

export default DailyServings;
