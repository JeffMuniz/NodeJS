
import styled from 'styled-components';
import { Radio } from '~/components';
import {
 BaseLabel, Clickable, PrimaryButton, Spacer,
} from '~/styled';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

export const FormEl = styled.form`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

export const NameRadioInput = styled(Radio)`
  margin-bottom: 15px;
`;

export const FallbackInfo = styled(BaseLabel)`
  align-self: center;
  font-size: 12px;
  width: 190px;
`;

export const Link = styled(FallbackInfo).attrs({
  as: Clickable,
})``;

export const FSpacer = styled(Spacer)``;

export const SubmitButton = styled(PrimaryButton)``;
