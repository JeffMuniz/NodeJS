
import styled, { css } from 'styled-components';
import { BaseInput } from '~/styled';

export const Wrapper = styled.div`
  display: flex;
`;

export const Input = styled(BaseInput).attrs({
  maxLength: 1,
})`
  width: 45px;
  border-radius: 8px;
  border: none;
  margin-right: 10px;
  text-align: center;

  &:last-child {
    margin-right: 0;
  }
  
  ${ ({ theme: { colors } }) => css`
    border: 2px solid ${ colors.palette.lightGray.main }
  ` }
`;
