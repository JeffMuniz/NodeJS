
import { FC } from 'react';
import { useFormikContext } from 'formik';
import {
 FOMPageSubtitle, RadioInput, Wrapper,
} from './fruit-on-menu.styles';

type FormValues = PATQuestionsPage.Form;

const FruitOnMenu: FC = () => {

  const { handleChange } = useFormikContext<FormValues>();

  return (
    <Wrapper>
      <FOMPageSubtitle>
        o estabelecimento possui fruta no cardápio?
      </FOMPageSubtitle>
      <RadioInput
        id='fruit-on-menu-1'
        label='Sim'
        name='fruitOnMenu'
        onChange={handleChange}
      />
      <RadioInput
        id='fruit-on-menu-2'
        label='Não'
        name='fruitOnMenu'
        onChange={handleChange}
      />
    </Wrapper>
  );
};

export default FruitOnMenu;
