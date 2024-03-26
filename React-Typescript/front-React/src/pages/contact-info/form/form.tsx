
import { FC } from 'react';
import { Formik } from 'formik';
import { useHistory } from 'react-router';
import { ROUTES } from '~/consts';
import {
 EmailInput, FSpacer, Form as FormEl, PhoneInput, SubmitButton, Wrapper,
} from './form.styles';

const Form: FC = () => {

  const history = useHistory();

  const handleFormSubmission = () => {
    history.push(ROUTES.CONTACT_PREFERENCE);
  };

  return (
    <Wrapper>
      <Formik
        initialValues={{
          email: '',
          phone: '',
        }}
        onSubmit={handleFormSubmission}
      >
        { ({
          errors,
          handleBlur,
          handleChange,
          touched,
          handleSubmit,
        }) => (
          <FormEl onSubmit={handleSubmit}>
            <EmailInput
              id='email'
              name='email'
              onChange={handleChange}
              onBlur={handleBlur}
              label='Email:'
              errorMessage={touched.email ? errors.email : null}
              placeholder='exemplo@gmail.com'
            />
            <PhoneInput
              id='phone'
              name='phone'
              onChange={handleChange}
              onBlur={handleBlur}
              label='Telefone:'
              errorMessage={touched.phone ? errors.phone : null}
              placeholder='00 000000000'
            />
            <FSpacer />
            <SubmitButton type='submit'>
              continuar
            </SubmitButton>
          </FormEl>
        ) }
      </Formik>
    </Wrapper>
  );
};

export default Form;
