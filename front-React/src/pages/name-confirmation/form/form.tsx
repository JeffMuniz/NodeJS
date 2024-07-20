
import { FC } from 'react';
import { Formik } from 'formik';
import { useHistory } from 'react-router';
import { ROUTES } from '~/consts';
import { nameValidation, validationBase } from '~/utils';
import {
 FSpacer, FallbackInfo, FormEl, Link, NameRadioInput, SubmitButton, Wrapper,
} from './form.styles';

const Form: FC = () => {

  const history = useHistory();

  const handleFormSubmission = () => {
    history.push(ROUTES.CPF_CONFIRMATION);
  };

  return (
    <Wrapper>
      <Formik
        initialValues={{ name: '' }}
        onSubmit={handleFormSubmission}
        validateOnMount
        validationSchema={ validationBase().shape({
          name: nameValidation(),
        }) }
      >
        { ({
          handleChange,
          handleSubmit,
          isValid,
        }) => (
          <FormEl onSubmit={handleSubmit}>
            <NameRadioInput
              label='Maquiina Edu'
              id='name_1'
              name='name'
              onChange={handleChange}
            />
            <NameRadioInput
              label='Maquiina Edu'
              id='name_2'
              name='name'
              onChange={handleChange}
            />
            <NameRadioInput
              label='Maria da Silva'
              id='name_3'
              name='name'
              onChange={handleChange}
            />
            <FallbackInfo>
              Se você é sócio mas seu nome não está na lista, <Link>clique aqui.</Link>
            </FallbackInfo>
            <FSpacer />
            <SubmitButton type='submit' disabled={!isValid}>
              confirmar
            </SubmitButton>
          </FormEl>
        ) }
      </Formik>
    </Wrapper>
  );
};

export default Form;
