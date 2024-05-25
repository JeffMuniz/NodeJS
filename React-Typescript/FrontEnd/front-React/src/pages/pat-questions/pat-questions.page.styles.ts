
import styled, { css } from 'styled-components';
import { LoadingButton } from '~/components';
import { mqTablet } from '~/styled';

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

export const MobileOnly = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  ${ mqTablet(css`
    display: none;
  `) }
`;

export const TabletOnly = styled(MobileOnly)`
  display: none;

  ${ mqTablet(css`
    display: flex;
  `) }
`;

export const SubmitButton = styled(LoadingButton).attrs({
  type: 'submit',
})``;
