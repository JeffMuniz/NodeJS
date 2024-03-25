
import styled, {css} from 'styled-components';
import {Table} from '~/components';
import {BaseLabel, mqTablet} from '~/styled';

export const Wrapper = styled(Table)`
  margin-bottom: 50px;

  ${mqTablet(css`
    display: none;
  `)}
`;

export const Text = styled(BaseLabel)`
  display: block;
  font-size: 14px;
  font-weight: 500;
  text-align: center;

  ${({theme: {colors}}) => css`
    color: ${colors.palette.black.main};
  `}
`;

export const TextBold = styled(Text)`
  font-size: 14px;
  font-weight: bold;
`;

export const Pink = styled.span(({theme: {colors}}) => css`
  color: ${colors.palette.pink.main};
  margin-left: 5px;
`);

export const TextSmall = styled(Text)`
  font-size: 12px;
  line-height: 12px;
  margin-top: 5px;
`;
