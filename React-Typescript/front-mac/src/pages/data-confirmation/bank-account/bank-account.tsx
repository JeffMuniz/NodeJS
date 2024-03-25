
import {FC} from 'react';
import {observer} from 'mobx-react-lite';
import {CartDataStore} from '~/stores';
import {
 AccountInput, AgencyInput, BankInput, DigitInput, Wrapper,
} from './bank-account.styles';

const BankAccount: FC = () => {

  const {
    account,
    agency,
    bank,
    digit,
  } = CartDataStore.state.bankAccount;

  return (
    <Wrapper>
      <BankInput value={bank} />
      <AgencyInput value={agency} />
      <AccountInput value={account} />
      <DigitInput value={digit} />
    </Wrapper>
  );
};

export default observer(BankAccount);
