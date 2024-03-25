
import { FC } from 'react';
import {
 CPFInput, CellphoneInput, EmailInput, NameInput, Wrapper,
} from './personal.styles';

const Personal: FC = () => (
  <Wrapper>
    <NameInput value='Maquiina Edu' />
    <CPFInput value='030 523 566-23' />
    <EmailInput value='Av. Paulista' />
    <CellphoneInput value='11 99999 9999' />
  </Wrapper>
);

export default Personal;
