
import styled from 'styled-components';

const { PUBLIC_URL } = process.env;

export const MachinaLogo = styled.img.attrs({
  src: `${PUBLIC_URL}/images/machina-logo.png`,
})`
  display: block;
  height: 512px;
  width: 512px;
`;

export const MachinaLogo2 = styled(MachinaLogo).attrs({
  src: `${PUBLIC_URL}/images/machina-logo-2.png`,
})``;
