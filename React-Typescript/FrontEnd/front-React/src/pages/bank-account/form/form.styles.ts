
import styled from 'styled-components';
import { Input, LoadingButton } from '~/components';
import { Spacer } from '~/styled';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

export const BankInput = styled(Input).attrs({
  label: 'Banco:',
  placeholder: 'Nome do banco',
})`
  margin-bottom: 20px;
`;

export const AgencyInput = styled(BankInput).attrs({
  label: 'Agência:',
  placeholder: '0000',
})``;

export const InlineWrapper = styled.div`
  display: flex;
  margin-bottom: 30px;
`;

export const AccountInput = styled(BankInput).attrs({
  label: 'Conta corrente jurídica:',
  placeholder: '00000',
})`
  align-self: center;
  margin-bottom: 0;
  flex-grow: 1;
`;

export const DigitInput = styled(AccountInput).attrs({
  label: 'Dígito:',
  placeholder: '00',
})`
  max-width: 100px;
`;

export const FSpacer = styled(Spacer)``;

export const ContinueButton = styled(LoadingButton)``;
