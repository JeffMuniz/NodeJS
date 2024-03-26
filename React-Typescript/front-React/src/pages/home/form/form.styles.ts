
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

export const CNPJInput = styled(Input)``;

export const FSpacer = styled(Spacer)``;

export const ContinueButton = styled(LoadingButton)``;
