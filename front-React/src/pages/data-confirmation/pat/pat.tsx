
import { FC } from 'react';
import {
 AcquirerWrapper, CheckboxLogoWrapper, DetailLabel, DetailWrapper, EditLabel, GetnetLogo, PCheckbox, PagSeguroLogo, SafrapayLogo, Wrapper,
} from './pat.styles';

const Pat: FC = () => (
  <Wrapper>
    <EditLabel>
      editar
    </EditLabel>
    <AcquirerWrapper>
      <PCheckbox>
        <GetnetLogo />
      </PCheckbox>
      <DetailWrapper>
        <DetailLabel>
          número do estabelecimento:
        </DetailLabel>
        <DetailLabel>
          1234
        </DetailLabel>
      </DetailWrapper>
    </AcquirerWrapper>
  </Wrapper>
);

export default Pat;
