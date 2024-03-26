
import styled from 'styled-components';
import {
 BaseLabel, PageSubtitle, PrimaryButton,
} from '~/styled';

const { PUBLIC_URL } = process.env;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin-top: -50px;
`;

export const PromotionalImage = styled.img.attrs({
  src: `${PUBLIC_URL}/images/promotional.png`,
})`
  margin-bottom: 20px;
`;

export const CPageSubtitle = styled(PageSubtitle)`
  align-self: center;
  margin-bottom: 20px;
  text-align: center;
`;

export const Info = styled(BaseLabel)`
  align-self: center;
  flex-grow: 1;
  font-size: 12px;
  font-weight: 500;
  margin-bottom: 30px;
  text-align: center;
`;

export const CloseButton = styled(PrimaryButton)``;
