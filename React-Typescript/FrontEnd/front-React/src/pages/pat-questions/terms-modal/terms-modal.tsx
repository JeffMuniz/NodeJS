
import { FC } from 'react';
import { useFormikContext } from 'formik';
import { observer } from 'mobx-react-lite';
import { PATQuestionsPageStore } from '../pat-questions.page.store';
import {
 CheckboxesWrapper, ContinueButton, TMCheckbox, TMPageSubtitle, Wrapper,
} from './terms-modal.styles';

const TermsModal: FC = () => {

  const { handleChange } = useFormikContext();

  const handleBackgroundClick = () => {
    PATQuestionsPageStore.setState(state => {
      state.showTermsModal = false;
    });
  };

  const { showTermsModal } = PATQuestionsPageStore.state;

  return (
    <Wrapper
      show={showTermsModal}
      onBackgroundClick={handleBackgroundClick}
    >
      <TMPageSubtitle>
        marque os campos para prosseguir
      </TMPageSubtitle>
      <CheckboxesWrapper>
        <TMCheckbox
          id='nutritional-term'
          label='Estou ciente de que as refeições em meu estabelecimento devem atender as exigências nutricionais estabelecidas, incluindo frutas, bem como oferecer sugestão diária de cardápio saudável em local de fácil consulta, nos termos da legislação do Programa de Alimentação do Trabalhador ("PAT")'
          name='test-check-name'
          onChange={handleChange}
        />
        <TMCheckbox
          id='truthful-info-term'
          label='Declaro que as informações acima são verdadeiras e aderente ao programa PAT previsto em lei vigente.'
          name='test-check-name'
          onChange={handleChange}
        />
      </CheckboxesWrapper>
      <ContinueButton>
        continuar
      </ContinueButton>
    </Wrapper>
  );
};

export default observer(TermsModal);
