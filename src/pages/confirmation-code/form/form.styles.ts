import styled from 'styled-components';
import { DigitInput, LoadingButton } from '~/components';
import { Clickable, Spacer } from '~/styled';

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

export const FDigitInput = styled(DigitInput)`
  margin-bottom: 10px;
`;

export const ResendLabel = styled(Clickable)`
  font-size: 12px;
  font-weight: 500;
`;

export const FSpacer = styled(Spacer)``;

export const SubmitButton = styled(LoadingButton)``;
