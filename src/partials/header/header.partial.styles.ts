
import styled, { css } from 'styled-components';
import { BackButton, ProgressBar } from '~/components';

export const Wrapper = styled.div<{ hide: boolean; }>`
  height: 60px;
  padding: 20px;
  padding-bottom: 0;
  position: fixed;
  width: 100%;
  
  ${ ({ theme: { colors } }) => css`
    background-color: ${colors.palette.white.main};
  ` }

  ${ ({ hide }) => hide && css`
    display: none;
  ` }
`;

export const HBackButton = styled(BackButton)`
  width: 20px;
`;

export const HProgressBar = styled(ProgressBar)`
  margin-top: -25px;
`;
