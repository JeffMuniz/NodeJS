import {
  Button as AntButton,
  Row as AntRow,
  Col as AntCol,
  Typography
} from '@mac/shared-ui';

import styled, { css } from 'styled-components';
import theme from '@/theme';

const { Text } = Typography;

type FlexRowProps = {
  justify?: string;
  flex?: number;
  maxWidth?: string;
};

export const ArrowImage = styled.img`
  margin-right: 20px;
`;

export const BoxTitle = styled.div`
  display: flex;
  align-items: center;
`;

export const Button = styled(AntButton)`
  margin-top: 20px;
`;

export const Col = styled(AntCol)`
  background-color: ${theme.background.yellow};
  display: flex;
  align-items: center;
`;

export const ColFields = styled(AntCol)`
  padding: 30px 70px;
`;

export const Column = styled(AntRow)`
  flex-direction: column;
  align-items: center;
  height: 100%;
`;

export const CommonTitle = css`
  font-family: Barlow, sans-serif;
  font-weight: bold;
  color: ${theme.black};
`;

export const FlexRow = styled.div<FlexRowProps>`
  display: flex;
  flex-direction: column;
  justify-content: ${props => props.justify || 'top'};
  flex: ${props => props.flex || 1};
  width: 100%;
  max-width: ${props => props.maxWidth || 'inherit'};
`;

export const FooterTitle = styled(Text)`
  ${CommonTitle}
  font-size: 16px;
  text-transform: uppercase;
`;

export const ImageStyled = styled.img`
  width: 100%;
`;

export const Row = styled(AntRow)`
  height: 100vh;
`;

export const Subtitle = styled(Text)`
  font-size: 32px;
  color: ${theme.green};
  padding-left: 37px;
`;

export const Title = styled.h1`
  ${CommonTitle}
  font-size: 56px;
  margin-bottom: 0.1em;
`;
