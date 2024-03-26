import { FC } from 'react';
import { Formik } from 'formik';
import { useHistory } from 'react-router';
import { ROUTES } from '~/consts';
import {
 FDigitInput, FSpacer, Form as FormEl, ResendLabel, SubmitButton, Wrapper,
} from './form.styles';

const Form: FC = () => {

  const history = useHistory();

  const handleFormSubmission = () => {
    history.push(ROUTES.IDENTITY_CONFIRMATION);
  };

  return (
    <Wrapper>
      <Formik
        initialValues={{
          code: '',
        }}
        onSubmit={handleFormSubmission}
        validateOnMount
      >
        {({
          handleChange,
          handleSubmit,
        }) => (
          <FormEl onSubmit={handleSubmit}>
            <FDigitInput
              digits={6}
              onChange={handleChange}
            />
            <ResendLabel>
              reenviar código
            </ResendLabel>
            <FSpacer />
            <SubmitButton onClick={handleSubmit}>
              continuar
            </SubmitButton>
          </FormEl>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Form;
