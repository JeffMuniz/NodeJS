
import styled from 'styled-components';
import { Input } from '~/components';

export const Wrapper = styled.div`
  margin-bottom: 50px;
`;

export const NameInput = styled(Input).attrs({
  label: 'Nome:',
})`
  margin-bottom: 20px;
`;

export const CPFInput = styled(NameInput).attrs<Input.Props>({
  label: 'CPF:',
})``;

export const EmailInput = styled(NameInput).attrs<Input.Props>({
  label: 'Endereço:',
  showEditIndicator: true,
})``;

export const CellphoneInput = styled(EmailInput).attrs<Input.Props>({
  label: 'Telefone Celular:',
})`
  margin-bottom: 0;
`;
