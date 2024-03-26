
import styled from 'styled-components';
import { Radio } from '~/components';
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

export const PreferredMediumInput = styled(Radio)`
  margin-bottom: 15px;
`;

export const FSpacer = styled(Spacer)``;

export const SubmitButton = styled(PrimaryButton)``;
