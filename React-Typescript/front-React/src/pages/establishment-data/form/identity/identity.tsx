
import { FC } from 'react';
import { useFormikContext } from 'formik';
import {
 CompanyNameInput, EstablishmentPhoneInput, TradingNameInput, Wrapper,
} from './identity.styles';

type Context = EstablishmentDataPage.Form.FormValues;

const Identity: FC = () => {

  const {
    errors,
    handleChange,
    touched,
    values,
    initialValues,
  } = useFormikContext<Context>();

  return (
    <Wrapper>
      <CompanyNameInput
        errorMessage={touched.companyName ? errors.companyName : null}
        id='company-name'
        label='nome social:'
        name='companyName'
        onChange={handleChange}
        value={values.companyName}
      />
      <TradingNameInput
        errorMessage={touched.tradingName ? errors.tradingName : null}
        id='trading-name'
        label='nome fantasia:'
        name='tradingName'
        onChange={handleChange}
        showEditIndicator
        value={values.tradingName}
        placeholder={initialValues.tradingName}
      />
      <EstablishmentPhoneInput
        label='telefone do estabelecimento:'
        id='trading-name'
        value={values.establishmentPhone}
        onChange={handleChange}
        placeholder='11 99999 9999'
        showEditIndicator
        errorMessage={
          touched.establishmentPhone
          ? errors.establishmentPhone
          : null
        }
      />
    </Wrapper>
  );
};

export default Identity;
