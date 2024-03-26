import styled from "styled-components";
import { blue, grey } from "@colors";

export const ModalBody = styled.div`
  width: 405px;
  padding: 37px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const LoadingPercents = styled.p`
  font-weight: 700;
  line-height: 30px;
  font-size: 20px;
  text-align: center;
  letter-spacing: 0.45px;
  color: ${blue};
  margin: 14.29px 0 8.2px;
`;

export const ModalText = styled.p`
  line-height: 30px;
  font-size: 18px;
  text-align: center;
  letter-spacing: 0.45px;
  margin: 0;
  color: ${grey};
`;
