
import { FC, useState } from 'react';
import { Formik } from 'formik';
import { useHistory } from 'react-router';
import { ROUTES } from '~/consts';
import { cnpjValidation, validationBase } from '~/utils';
import { Form as FormEl, Wrapper } from './form.styles';
import {
 CNPJInput, ContinueButton, FSpacer,
} from './form.styles';

const Form: FC = () => {

  const history = useHistory();

  const [ state, setState ] = useState<HomePage.Form.State>({
    isLoading: false,
  });

  const handleSubmit = () => {
    setState(prev => ({
      ...prev,
      isLoading: true,
    }));
    console.log('navigated');
    setTimeout(() => {
      console.log('navigated 2');
      history.push(ROUTES.NAME_CONFIRMATION);
    }, 1000);
  };

  return (
    <Wrapper>
      <Formik
        initialValues={ { cnpj: '' } }
        onSubmit={handleSubmit}
        validateOnMount
        validationSchema={ validationBase().shape({
          cnpj: cnpjValidation(),
        }) }
      >
        { ({
          errors,
          handleBlur,
          handleChange,
          touched,
          handleSubmit,
          isValid,
        }) => (
          <FormEl onSubmit={handleSubmit}>
            <CNPJInput
              id='cnpj'
              placeholder='digite o seu cnpj'
              name='cnpj'
              onChange={handleChange}
              onBlur={handleBlur}
              errorMessage={touched.cnpj ? errors.cnpj : null }
            />
            <FSpacer />
            <ContinueButton
              onClick={handleSubmit}
              isLoading={state.isLoading}
              disabled={!isValid}
            >
              continuar
            </ContinueButton>
          </FormEl>
        ) }
      </Formik>
    </Wrapper>
  );
};

export default Form;
