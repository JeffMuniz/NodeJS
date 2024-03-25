
import { FC } from 'react';
import {
 CieloSlip, CloseButton, GetnetSlip, InfoLabel, RedeSlip, SafrapaySlip, WarningContent, WarningTitle, Wrapper,
} from './slip-modal.styles';

type Props = AcquirerPage.OptionConfig.SlipModal.Props;

const SlipModal: FC<Props> = ({
  acquirer,
  onCloseClick,
  show,
}) => {

  let digits: number;
  switch (acquirer) {
    case 'getnet':
    case 'safrapay': digits = 15; break;
    case 'cielo':
    case 'rede': digits = 10; break;
    default: throw new Error('Unknown acquirer.');
  }

  return (
    <Wrapper
      show={show}
      onBackgroundClick={onCloseClick}
    >
      <InfoLabel>
        número impresso com até {digits} digitos
      </InfoLabel>
      { acquirer === 'cielo' && <CieloSlip /> }
      { acquirer === 'getnet' && <GetnetSlip /> }
      { acquirer === 'rede' && <RedeSlip /> }
      { acquirer === 'safrapay' && <SafrapaySlip /> }
      <WarningTitle>
        Importante:
      </WarningTitle>
      <WarningContent>
        O número ode EC da Cielo é composto por 10 dígitos. Por isso, desconsidere os 2 primeiros e os 4 últimos conforme a imagem
      </WarningContent>
      <CloseButton onClick={onCloseClick}>
        fechar
      </CloseButton>
    </Wrapper>
  );
};

export default SlipModal;
