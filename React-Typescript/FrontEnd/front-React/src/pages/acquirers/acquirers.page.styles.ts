
import styled from 'styled-components';
import { LoadingButton } from '~/components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

export const ContinueButton = styled(LoadingButton).attrs({
  type: 'submit',
})``;
