
import { FC } from 'react';
import {
 CPageSubtitle, CloseButton, Info, PromotionalImage, Wrapper,
} from './congrats.page.styles';

const { REACT_APP_MACHINA_INSTITUTIONAL_ADDRESS } = process.env;

const CongratsPage: FC = () => {

  const handleCloseClick = () => {
    window.open(REACT_APP_MACHINA_INSTITUTIONAL_ADDRESS, '_self');
  };

  return (
    <Wrapper>
      <PromotionalImage />
      <CPageSubtitle>
        credenciamento efetuado com sucesso!
      </CPageSubtitle>
      <Info>
        a contagem regressiva começou! em no máximo 5 dias, você recebrá um e-mail para se cadastrar em nosso portal.
      </Info>
      <CloseButton onClick={handleCloseClick}>
        página inicial
      </CloseButton>
    </Wrapper>
  );
};

export default CongratsPage;
