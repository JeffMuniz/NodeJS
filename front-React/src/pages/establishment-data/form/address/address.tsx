
import { FC } from 'react';
import { useFormikContext } from 'formik';
import {
 AdditionalInfoInput, BottomLine, CityInput, InlineWrapper, NeighborhoodInput, NumberInput, StateInput, StreetInput, Wrapper, ZipCodeInput,
} from './address.styles';

type Context = EstablishmentDataPage.Form.FormValues;

const Address: FC = () => {

  const {
    errors,
    handleBlur,
    handleChange,
    touched,
    values,
  } = useFormikContext<Context>();

  return (
    <Wrapper>
      <StreetInput
        errorMessage={ touched.street ? errors.street : null }
        id='street'
        label='endereço:'
        name='street'
        onBlur={handleBlur}
        onChange={handleChange}
        placeholder='Av Paulista'
        value={values.street}
      />
      <InlineWrapper>
        <NumberInput
          errorMessage={ touched.number ? errors.number : null }
          id='number'
          label='número:'
          name='number'
          onBlur={handleBlur}
          onChange={handleChange}
          placeholder='00'
          showEditIndicator
          value={values.number}
        />
        <BottomLine />
        <AdditionalInfoInput
          errorMessage={ touched.additionalInfo ? errors.additionalInfo : null }
          id='additional-info'
          label='complemento:'
          name='additionalInfo'
          onBlur={handleBlur}
          onChange={handleChange}
          placeholder='Apto 101'
          showEditIndicator
          value={values.additionalInfo}
        />
      </InlineWrapper>
      <ZipCodeInput
        errorMessage={ touched.zipCode ? errors.zipCode : null }
        id='zip-code'
        label='cep:'
        name='zipCode'
        onBlur={handleBlur}
        onChange={handleChange}
        placeholder='00000-000'
        showEditIndicator
        value={values.zipCode}
      />
      <NeighborhoodInput
        errorMessage={ touched.neighborhood ? errors.neighborhood : null }
        id='neighborhood'
        label='bairro:'
        name='neighborhood'
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.neighborhood}
      />
      <CityInput
        errorMessage={ touched.city ? errors.city : null }
        id='city'
        label='cidade:'
        name='city'
        onBlur={handleBlur}
        onChange={handleChange}
        placeholder='São Paulo'
        value={values.city}
      />
      <StateInput
        errorMessage={ touched.state ? errors.state : null }
        id='state'
        label='estado:'
        name='state'
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.state}
      />
    </Wrapper>
  );
};

export default Address;
