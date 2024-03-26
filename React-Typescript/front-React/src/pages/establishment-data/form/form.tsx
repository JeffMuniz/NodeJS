
import { FC } from 'react';
import { Formik } from 'formik';
import Address from './address/address';
import {
 Form as FormEl, SubmitButton, Wrapper,
} from './form.styles';
import Identity from './identity/identity';

const Form: FC = () => {

  const handleFormSubmission = () => {

  };

  return (
    <Wrapper>
      <Formik
        initialValues={{
          // Identity START
          companyName: 'Padaria Gomes LTDA',
          tradingName: 'Padaria Bom Sucesso',
          establishmentPhone: '',
          // Identity END

          // Address START
          additionalInfo: 'loja 0',
          city: 'São Paulo',
          neighborhood: 'Bela Vista',
          number: '00',
          state: 'São Paulo',
          street: 'Av Paulista',
          zipCode: '00000-000',
          // Address END
        }}
        onSubmit={handleFormSubmission}
      >
        { ({ handleSubmit }) => (
          <FormEl onSubmit={handleSubmit}>
            <Identity />
            <Address />
            <SubmitButton>
              continuar
            </SubmitButton>
          </FormEl>
        ) }
      </Formik>
    </Wrapper>
  );
};

export default Form;
