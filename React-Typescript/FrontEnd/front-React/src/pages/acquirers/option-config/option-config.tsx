
import { FC, useState } from 'react';
import {
  AddLineLabel, AffiliationNumberInput, CieloLogo, CirclePlusIcon, FindAffiliationCode, GetnetLogo, OCCheckbox, OCPageSubtitle, RedeLogo, SafrapayLogo, Wrapper,
} from './option-config.styles';
import SlipModal from './slip-modal/slip-modal';

const OptionConfig: FC<AcquirerPage.OptionConfig.Props> = ({ acquirer }) => {

  const [ state, setState ] = useState({
    showAffiliationCodeHelper: false,
    hasSlip: false,
  });

  const handleFindAffiliationCodeClick = () => {
    setState(prev => ({
      ...prev,
      showAffiliationCodeHelper: true,
    }));
  };

  const handleAffiliationCodeHelperCloseClick = () => {
    setState(prev => ({
      ...prev,
      showAffiliationCodeHelper: false,
    }));
  };

  return (
    <Wrapper>
      <OCPageSubtitle>
        insira o número do estabelecimento
      </OCPageSubtitle>
      <FindAffiliationCode onClick={handleFindAffiliationCodeClick}>
        onde encontrar o código de filiação
      </FindAffiliationCode>
      <OCCheckbox>
        { acquirer === 'cielo' && <CieloLogo /> }
        { acquirer === 'getnet' && <GetnetLogo /> }
        { acquirer === 'rede' && <RedeLogo /> }
        { acquirer === 'safrapay' && <SafrapayLogo /> }
      </OCCheckbox>
      <AffiliationNumberInput
        label='Número do Estabelecimento:'
        placeholder='00000000000'
      />
      <AddLineLabel>
        <CirclePlusIcon />
        adicionar linha
      </AddLineLabel>
      <SlipModal
        acquirer={acquirer}
        onCloseClick={handleAffiliationCodeHelperCloseClick}
        show={state.showAffiliationCodeHelper}
      />
    </Wrapper>
  );
};

export default OptionConfig;
