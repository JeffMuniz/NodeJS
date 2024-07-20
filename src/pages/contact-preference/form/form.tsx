
import { FC } from 'react';
import { Formik } from 'formik';
import { useHistory } from 'react-router';
import { ROUTES } from '~/consts';
import {
 FSpacer, Form as FormEl, PreferredMediumInput, SubmitButton, Wrapper,
} from './form.styles';

const Form: FC = () => {

  const history = useHistory();

  const handleFormSubmission = () => {
    history.push(ROUTES.CONFIRMATION_CODE);
  };

  return (
    <Wrapper>
      <Formik
        onSubmit={handleFormSubmission}
        initialValues={{
          preferredMedium: '',
        }}
      >
        { ({
          handleChange,
          handleSubmit,
        }) => (
          <FormEl onSubmit={handleSubmit}>
            <PreferredMediumInput
              label='celular'
              id='preferred-medium-1'
              name='preferred-medium'
              onChange={handleChange}
            />
            <PreferredMediumInput
              label='email'
              id='preferred-medium-2'
              name='preferred-medium'
              onChange={handleChange}
            />
            <FSpacer />
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
