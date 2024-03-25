
import styled from 'styled-components';
import { Input } from '~/components';
import { PrimaryButton, Spacer } from '~/styled';

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

export const EmailInput = styled(Input)`
  margin-bottom: 20px;
`;

export const PhoneInput = styled(EmailInput)`
  margin-bottom: 0;
`;

export const FSpacer = styled(Spacer)``;

export const SubmitButton = styled(PrimaryButton)``;
