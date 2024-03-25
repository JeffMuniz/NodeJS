
import {FC} from 'react';
import {useFormikContext} from 'formik';
import {
 maskMiddleware, onlyNumbersMask, zipCodeMask,
} from '~/utils';
import {
 AdditionalInfoInput, CityInput, InlineWrapper, NeighborhoodInput, NumberInput, StateInput, StreetInput, TabletInlineWrapper, Wrapper, ZipCodeInput,
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
      <TabletInlineWrapper>
        <ZipCodeInput
          errorMessage={touched.zipCode ? errors.zipCode : null}
          id='zip-code'
          label='cep:'
          name='zipCode'
          onBlur={handleBlur}
          onChange={event => maskMiddleware({
            event,
            mask: zipCodeMask,
            handleChange,
          })}
          placeholder='00000-000'
          showEditIndicator
          value={values.zipCode}
        />
        <StreetInput
          errorMessage={touched.street ? errors.street : null}
          id='street'
          label='endereço:'
          name='street'
          placeholder='Av Paulista'
          value={values.street}
          disabled
        />
        <InlineWrapper>
          <NumberInput
            errorMessage={touched.number ? errors.number : null}
            id='number'
            label='número:'
            name='number'
            onBlur={handleBlur}
            onChange={event => maskMiddleware({
              event,
              mask: onlyNumbersMask,
              handleChange,
            })}
            placeholder='0000'
            showEditIndicator
            value={values.number}
            maxLength={6}
          />
          <AdditionalInfoInput
            errorMessage={touched.additionalInfo ? errors.additionalInfo : null}
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
      </TabletInlineWrapper>
      <TabletInlineWrapper>
        <NeighborhoodInput
          errorMessage={touched.neighborhood ? errors.neighborhood : null}
          id='neighborhood'
          label='bairro:'
          name='neighborhood'
          value={values.neighborhood}
          disabled
        />
        <CityInput
          errorMessage={touched.city ? errors.city : null}
          id='city'
          label='cidade:'
          name='city'
          placeholder='São Paulo'
          value={values.city}
          disabled
        />
        <StateInput
          errorMessage={touched.state ? errors.state : null}
          id='state'
          label='estado:'
          name='state'
          value={values.state}
          disabled
        />
      </TabletInlineWrapper>
    </Wrapper>
  );
};

export default Address;
