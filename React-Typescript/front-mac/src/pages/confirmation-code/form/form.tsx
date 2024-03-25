
import {FC} from 'react';
import {Formik} from 'formik';
import {useHistory} from 'react-router';
import {ROUTES} from '~/consts';
import {customValidation, validationBase} from '~/utils';
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
        initialValues={{code: ''}}
        validationSchema={validationBase().shape({
          code: customValidation()
            .string()
            .max(6)
            .min(6)
            .required(),
        })}
        initialTouched={{code: true}}
        onSubmit={handleFormSubmission}
        validateOnMount
      >
        {({
          handleSubmit,
          setFieldValue,
          isValid,
        }) => (
          <FormEl onSubmit={handleSubmit}>
            <FDigitInput
              autoFocus
              onChange={(value) => setFieldValue('code', value)}
            />
            <ResendLabel>
              reenviar código
            </ResendLabel>
            <FSpacer />
            <SubmitButton type='submit' disabled={!isValid}>
              continuar
            </SubmitButton>
          </FormEl>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Form;
