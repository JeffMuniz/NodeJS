
import {FC} from 'react';
import {observer} from 'mobx-react-lite';
import {CartDataStore} from '~/stores';
import {
 AdditionalInfoInput, CNPJInput, CityInput, NameInput, NeighborhoodInput, NumberInput, PhoneInput, StateInput, StreetInput, TabletInlineWrapper, TradingNameInput, Wrapper, ZipCodeInput,
} from './establishment.styles';

const Establishment: FC = () => {

  const {
    cnpj,
    establishment: {
      additionalInfo,
      city,
      name,
      neighborhood,
      number,
      phone,
      state,
      street,
      tradingName,
      zipCode,
    },
  } = CartDataStore.state;

  return (
    <Wrapper>
      <TabletInlineWrapper>
        <CNPJInput value={cnpj} />
        <NameInput value={name} />
      </TabletInlineWrapper>
      <TabletInlineWrapper>
        <TradingNameInput value={tradingName} />
        <PhoneInput value={phone} />
      </TabletInlineWrapper>
      <TabletInlineWrapper>
        <ZipCodeInput value={zipCode} />
        <StreetInput value={street} />
        <NumberInput value={number} />
      </TabletInlineWrapper>
      <TabletInlineWrapper>
        <AdditionalInfoInput value={additionalInfo} />
        <NeighborhoodInput value={neighborhood} />
        <CityInput value={city} />
        <StateInput value={state} />
      </TabletInlineWrapper>
    </Wrapper>
  );
};

export default observer(Establishment);
