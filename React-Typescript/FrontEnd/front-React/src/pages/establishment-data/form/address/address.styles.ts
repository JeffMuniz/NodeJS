
import { Fragment } from 'react';
import styled, { css } from 'styled-components';
import { Input } from '~/components';

export const Wrapper = Fragment;

export const StreetInput = styled(Input)`
  margin-bottom: 20px;
`;

export const InlineWrapper = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

export const BottomLine = styled.div`
  align-self: flex-end;
  border-bottom: solid 1px;
  margin-bottom: 3px;
  width: 40px;
  
  ${ ({ theme: { colors } }) => css`
    border-color: ${ colors.text.common };
  ` }
`;

export const NumberInput = styled(StreetInput)`
  align-self: flex-end;
  margin-bottom: 0;
  width: 100px;
`;

export const AdditionalInfoInput = styled(NumberInput)`
  flex-grow: 1;
`;

export const ZipCodeInput = styled(StreetInput)``;

export const NeighborhoodInput = styled(StreetInput)``;

export const CityInput = styled(StreetInput)``;

export const StateInput = styled(StreetInput)`
  margin-bottom: 50px;
`;
