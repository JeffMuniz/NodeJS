
import {FC} from 'react';
import {observer} from 'mobx-react-lite';
import {CartDataStore} from '~/stores';
import {
 CPFInput, CellphoneInput, EmailInput, NameInput, Wrapper,
} from './personal.styles';

const Personal: FC = () => {

  const {
    cpf,
    email,
    name,
    phone,
  } = CartDataStore.state.owner;

  return (
    <Wrapper>
      <NameInput value={name} />
      <CPFInput value={cpf} />
      <EmailInput value={email} />
      <CellphoneInput value={phone} />
    </Wrapper>
  );
};

export default observer(Personal);
