
import { FC } from 'react';
import {
 ACheckbox, CheckboxesWrapper, CieloLogo, GetnetLogo, OPageSubtitle, PagSeguroLogo, RedeLogo, SafrapayLogo, StoneLogo, Wrapper,
} from './options.styles';

const Options: FC = () => {

  return (
    <Wrapper>
      <OPageSubtitle>
        a machina hoje trabalha com as maquininhas abaixo.<br />em quais delas você deseja habilitar os cartões da machina?
      </OPageSubtitle>
      <CheckboxesWrapper>
        <ACheckbox id='acquirer-1' onChange={() => { }}>
          <GetnetLogo />
        </ACheckbox>
        <ACheckbox id='acquirer-2' onChange={() => { }}>
          <SafrapayLogo />
        </ACheckbox>
        <ACheckbox id='acquirer-3' onChange={() => { }}>
          <CieloLogo />
        </ACheckbox>
        <ACheckbox id='acquirer-4' onChange={() => { }}>
          <RedeLogo />
        </ACheckbox>
        <ACheckbox id='acquirer-5' onChange={() => { }}>
          <StoneLogo />
        </ACheckbox>
        <ACheckbox id='acquirer-6' onChange={() => { }}>
          <PagSeguroLogo />
        </ACheckbox>
      </CheckboxesWrapper>
    </Wrapper>
  );
};

export default Options;
