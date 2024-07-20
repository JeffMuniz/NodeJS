
import styled from 'styled-components';
import { Input } from '~/components';

export const Wrapper = styled.div``;

export const BankInput = styled(Input).attrs({
  label: 'Banco:',
  showEditIndicator: true,
})`
  margin-bottom: 20px;
`;

export const AgencyInput = styled(BankInput).attrs<Input.Props>({
  label: 'Agência:',
})``;

export const AccountInput = styled(BankInput).attrs<Input.Props>({
  label: 'Conta corrente jurídica:',
})``;

export const DigitInput = styled(BankInput).attrs<Input.Props>({
  label: 'Dígito:',
})``;
