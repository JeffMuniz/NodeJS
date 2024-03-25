import styled, {css} from 'styled-components';
import {DigitInput, LoadingButton} from '~/components';
import {
 Clickable, Spacer, mqTablet,
} from '~/styled';

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

export const FDigitInput = styled(DigitInput).attrs({
  digits: 6,
  label: 'Código:',
})`
  margin-bottom: 10px;
  label {
    display: none;
  }

  ${mqTablet(css`
    label {
      display: block;
    }
  `)}
`;

export const ResendLabel = styled(Clickable)`
  font-size: 12px;

  ${mqTablet(css`
    font-size: 14px;
  `)}
`;

export const FSpacer = styled(Spacer)``;

export const SubmitButton = styled(LoadingButton).attrs({
  type: 'submit',
})`
  align-self: flex-end;
`;
