
import styled from 'styled-components';
import { Checkbox, Input } from '~/components';
import { Clickable, PageSubtitle } from '~/styled';

const { PUBLIC_URL } = process.env;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

export const OCPageSubtitle = styled(PageSubtitle)`
  margin-bottom: 5px;
`;

export const FindAffiliationCode = styled(Clickable)`
  display: block;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 20px;
`;

export const OCCheckbox = styled(Checkbox)`
  align-self: flex-start;
  height: 55px;
  margin-bottom: 10px;
  
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

// export const StoneLogo = styled.img.attrs({
//   src: `${PUBLIC_URL}/images/stone-logo.png`,
// })`
//   margin-top: -15px;
//   max-height: 54px;
// `;

// export const PagSeguroLogo = styled.img.attrs({
//   src: `${PUBLIC_URL}/images/pag-seguro-logo.png`,
// })`
//   max-height: 37px;
// `;

export const AffiliationNumberInput = styled(Input)`
  margin-bottom: 10px;
`;

export const AddLineLabel = styled(FindAffiliationCode)`
  display: flex;
  line-height: 20px;
`;

export const CirclePlusIcon = styled.img.attrs({
  src: `${PUBLIC_URL}/icons/circle-plus.svg`,
})`
  height: 20px;
  margin-right: 5px;
`;
