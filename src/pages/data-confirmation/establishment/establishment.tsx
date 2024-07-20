
import { FC } from 'react';
import {
 AdditionalInfoInput, CNPJInput, CityInput, NeighborhoodInput, NumberInput, PhoneInput, StateInput, StreetInput, TradingNameInput, Wrapper, ZipCodeInput,
} from './establishment.styles';

const Establishment: FC = () => (
  <Wrapper>
    <CNPJInput value='45.698.747/0001-01' />
    <TradingNameInput value='Padaria Sulamerica' />
    <PhoneInput value='11 2222-2222' />
    <ZipCodeInput value='00.000-000' />
    <StreetInput value='Av. Paulista' />
    <NumberInput value='999' />
    <AdditionalInfoInput value='Loja 02' />
    <NeighborhoodInput value='Bela Vista' />
    <CityInput value='São Paulo' />
    <StateInput value='SP' />
  </Wrapper>
);

export default Establishment;
