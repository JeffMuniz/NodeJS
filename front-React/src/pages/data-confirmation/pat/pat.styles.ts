
import styled from 'styled-components';
import { Checkbox } from '~/components';
import { BaseLabel, Clickable } from '~/styled';

const { PUBLIC_URL } = process.env;

export const Wrapper = styled.div`
  margin-bottom: 30px;
`;

export const EditLabel = styled(Clickable)``;

export const AcquirerWrapper = styled.div``;

export const CheckboxLogoWrapper = styled.div`
  display: flex;
`;

export const PCheckbox = styled(Checkbox)`
  * {
    align-self: center;
  }
  & > div {
    margin-right: 5px;
  }
`;

export const DetailWrapper = styled.div`
  padding-left: 35px;
`;

export const GetnetLogo = styled.img.attrs({
  src: `${PUBLIC_URL}/images/getnet-logo.png`,
})`
  height: 44px;
  align-self: center;
`;

export const SafrapayLogo = styled(GetnetLogo)``;

export const PagSeguroLogo = styled(GetnetLogo)``;

export const DetailLabel = styled(BaseLabel)`
  display: block;
`;
