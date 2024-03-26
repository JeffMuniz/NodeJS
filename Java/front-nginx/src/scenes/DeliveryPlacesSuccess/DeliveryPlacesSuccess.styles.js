import styled from "styled-components";
import { Row } from "react-styled-flexboxgrid";

import { lighterBlack, veryLightBlack, seashell } from "@colors";

export const RowStyled = styled(Row)`
  margin-top: 30px;
`;

export const PendingWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding-top: 175px;
`;

export const ImageWrapper = styled.div`
  text-align: center;
  margin: 0 0 18px;
`;

export const Title = styled.h1`
  color: ${lighterBlack};
  font-size: 32px;
  line-height: 44px;
  text-align: center;
  font-weight: 300;
  max-width: 620px;
  margin: 0 auto;
`;

export const Text = styled.p`
  color: ${veryLightBlack};
  margin: 0 auto 175px;
  max-width: 620px;
  text-align: center;
  font-size: 16px;
  line-height: 26px;
`;

export const Separator = styled.div`
  margin: 24px auto;
  background-color: ${seashell};
  width: 80px;
  height: 4px;
  border-radius: 2px;
`;
