
import styled from 'styled-components';
import { Content } from '@mac/shared-ui';

import backgroundHeart from '@/../public/images/background-heart.svg';

export const LContent = styled(Content)`
  > div > div {
    padding-bottom: 0;
  }
  background-color: #29292B;
`;

export const Heart = styled.img.attrs({
  src: backgroundHeart,
})`
  bottom: 0;
  height: 600px;
  left: 0;
  opacity: .6;
  position: fixed;
`;
