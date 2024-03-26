
import { FC } from 'react';
import {
 AccountInput, AgencyInput, BankInput, DigitInput, Wrapper,
} from './bank-account.styles';

const BankAccount: FC = () => (
  <Wrapper>
    <BankInput value='macnabank' />
    <AgencyInput value='9999' />
    <AccountInput value='111111' />
    <DigitInput value='01' />
  </Wrapper>
);

export default BankAccount;
