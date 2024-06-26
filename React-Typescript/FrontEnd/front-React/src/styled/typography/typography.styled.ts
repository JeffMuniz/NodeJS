
import styled, { css } from 'styled-components';
import { pointer } from '../helpers/helpers.styled';

export const BaseLabel = styled.label`
  font-size: 16px;
  font-weight: 300;

  ${ ({ theme: { colors } }) => css`
    color: ${ colors.text.common };
  ` }
`;

export const Clickable = styled(BaseLabel)`
  ${ pointer() }
  ${({ theme: { colors } }) => css`
    color: ${ colors.feedback.info };
  `}
`;

export const PageTitle = styled(BaseLabel).attrs({
  as: 'h1',
})`
  font-weight: 700;
  font-size: 26px;
  line-height: 28px;

  ${ ({ theme: { colors } }) => css`
    color: ${ colors.text.title };
  ` }
`;

export const PageSubtitle = styled(PageTitle).attrs({
  as: 'h2',
})`
  font-size: 18px;
`;
