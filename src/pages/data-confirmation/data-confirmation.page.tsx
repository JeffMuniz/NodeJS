
import { FC } from 'react';
import BankAccount from './bank-account/bank-account';
import {
 DCCheckedLabel, DCPageSubtitle, Wrapper,
} from './data-confirmation.page.styles';
import Establishment from './establishment/establishment';
import Pat from './pat/pat';
import Personal from './personal/personal';

const DataConfirmationPage: FC = () => (
  <Wrapper>
    <DCPageSubtitle>
      dados do proprioetário
    </DCPageSubtitle>
    <DCCheckedLabel label='dados corretos' />
    <Personal />

    <DCPageSubtitle>
      dados do estabelecimento
    </DCPageSubtitle>
    <DCCheckedLabel label='dados corretos' />
    <Establishment />

    <DCPageSubtitle>
      produtos escolhidos:
    </DCPageSubtitle>
    <Pat />

    <DCPageSubtitle>
      dados bancários:
    </DCPageSubtitle>
    <BankAccount />
  </Wrapper>
);

export default DataConfirmationPage;
