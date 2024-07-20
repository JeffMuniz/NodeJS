
import { FC } from 'react';
import { useFormikContext } from 'formik';
import {
 CardImage, InlineWrapper, RadioInput, RadioWrapper, VAAPageSubtitle, Wrapper,
} from './va-acceptance.styles';

type FormValues = PATQuestionsPage.Form;

const VAAcceptance: FC = () => {

  const { handleChange } = useFormikContext<FormValues>();

  return (
    <Wrapper>
      <VAAPageSubtitle>
        seu estabelecimento aceita cartão alimentação?
      </VAAPageSubtitle>
      <InlineWrapper>
        <CardImage />
        <RadioWrapper>
          <RadioInput
            label='Sim'
            name='vaAcceptance'
            id='va-acceptance-1'
            onChange={handleChange}
            value='yes'
          />
          <RadioInput
            label='Não'
            name='vaAcceptance'
            id='va-acceptance-2'
            onChange={handleChange}
            value='no'
          />
        </RadioWrapper>
      </InlineWrapper>
    </Wrapper>
  );
};

export default VAAcceptance;
