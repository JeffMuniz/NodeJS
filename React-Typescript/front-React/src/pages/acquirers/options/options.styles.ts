
import styled from 'styled-components';
import { Checkbox } from '~/components';
import { PageSubtitle } from '~/styled';

const { PUBLIC_URL } = process.env;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

export const OPageSubtitle = styled(PageSubtitle)`
  margin-bottom: 20px;
`;

export const CheckboxesWrapper = styled.div`
  align-self: center;
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;
  width: fit-content;
`;

export const ACheckbox = styled(Checkbox)`
  align-self: flex-start;
  height: 45px;
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
  
  & > * {
    align-self: center;
  }

  & > div {
    margin-right: 10px;
  }
`;

export const GetnetLogo = styled.img.attrs({
  src: `${PUBLIC_URL}/images/getnet-logo.png`,
})`
  align-self: center;
  display: block;
  max-height: 44px;
`;

export const SafrapayLogo = styled(GetnetLogo).attrs({
  src: `${PUBLIC_URL}/images/safrapay-logo.png`,
})`
  max-height: 38px;
`;

export const CieloLogo = styled.img.attrs({
  src: `${PUBLIC_URL}/images/cielo-logo.png`,
})`
  margin-top: -8px;
  max-height: 45px;
`;

export const RedeLogo = styled.img.attrs({
  src: `${PUBLIC_URL}/images/rede-logo.png`,
})`
  max-height: 38px;
  margin-top: -15px;
`;

export const StoneLogo = styled.img.attrs({
  src: `${PUBLIC_URL}/images/stone-logo.png`,
})`
  margin-top: -15px;
  max-height: 54px;
`;

export const PagSeguroLogo = styled.img.attrs({
  src: `${PUBLIC_URL}/images/pag-seguro-logo.png`,
})`
  max-height: 37px;
`;
