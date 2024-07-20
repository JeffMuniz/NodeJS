
import styled, { css } from 'styled-components';

import { BaseInput, BaseLabel } from '~/styled';

const { PUBLIC_URL } = process.env;

export const Wrapper = styled.div``;

export const Label = styled(BaseLabel)`
  font-size: 14px;
  margin-bottom: 3px;

  ${ ({ theme: { colors } }) => css`
    color: ${ colors.text.title };
  ` }
`;

export const InlineWrapper = styled.div`
  display: flex;
  margin-bottom: 3px;
`;

export const TextInput = styled(BaseInput)`
  align-self: center;
`;

export const EditIcon = styled.img.attrs({
  src: `${PUBLIC_URL}/icons/edit-pencil.svg`,
})`
  height: 16px;
  align-self: center;
  margin-left: -21px;
`;

export const ErrorMessage = styled(BaseLabel)`
  font-size: 16px;
  
  ${ ({ theme: { colors } }) => css`
    color: ${ colors.feedback.failure };
  ` }
`;
