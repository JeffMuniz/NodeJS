
import styled from 'styled-components';
import { Input } from '~/components';

export const Wrapper = styled.div`
  margin-bottom: 50px;
`;

export const CNPJInput = styled(Input).attrs({
  label: 'Nome:',
})`
  margin-bottom: 20px;
`;

export const TradingNameInput = styled(CNPJInput).attrs<Input.Props>({
  label: 'Nome da Empresa:',
})``;

export const ZipCodeInput = styled(CNPJInput).attrs<Input.Props>({
  label: 'CEP:',
  showEditIndicator: true,
})``;

export const StreetInput = styled(CNPJInput).attrs<Input.Props>({
  label: 'Endereço:',
})``;

export const NumberInput = styled(ZipCodeInput).attrs<Input.Props>({
  label: 'Número:',
})``;

export const AdditionalInfoInput = styled(ZipCodeInput).attrs<Input.Props>({
  label: 'Complemento:',
})``;

export const PhoneInput = styled(ZipCodeInput).attrs<Input.Props>({
  label: 'Telefone:',
})``;

export const NeighborhoodInput = styled(CNPJInput).attrs<Input.Props>({
  label: 'Bairro:',
})``;

export const CityInput = styled(CNPJInput).attrs<Input.Props>({
  label: 'Cidade:',
})``;

export const StateInput = styled(CNPJInput).attrs<Input.Props>({
  label: 'Estado:',
})``;
