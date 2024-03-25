
import {FC} from 'react';
import {Formik} from 'formik';
import {observer} from 'mobx-react-lite';
import {useHistory} from 'react-router';
import {ROUTES} from '~/consts';
import {existsValidation, validationBase} from '~/utils';
import {ContactPreferencePageStore} from '../contact-preference.page.store';
import {
 FSpacer, Form as FormEl, PreferredMediumInput, SubmitButton, Wrapper,
} from './form.styles';

type FormValues = ContactPreferencePage.Form.FormValues;

const Form: FC = () => {

  const history = useHistory();

  const handleFormSubmission = async(values: FormValues) => {
    await ContactPreferencePageStore.sendCode(values.preferredMedium);
    history.push(ROUTES.CONFIRMATION_CODE);
  };

  const {isLoading} = ContactPreferencePageStore.state;

  return (
    <Wrapper>
      <Formik<FormValues>
        onSubmit={handleFormSubmission}
        initialValues={{
          preferredMedium: null,
        }}
        validationSchema={validationBase().shape({
          preferredMedium: existsValidation(),
        })}
        validateOnMount
      >
        {({
          handleChange,
          handleSubmit,
          isValid,
          values,
        }) => (
          <FormEl onSubmit={handleSubmit}>
            {[{
              value: 'phone',
              label: 'celular',
            }, {
              value: 'email',
              label: 'email',
            }].map((m, index) => (
              <PreferredMediumInput
                key={`preferred-medium-${index}`}
                label={m.label}
                id={`preferred-medium-${index}`}
                name='preferredMedium'
                onChange={handleChange}
                value={m.value}
                checked={values.preferredMedium === m.value}
              />
            ))}
            <FSpacer />
            <SubmitButton isLoading={isLoading} disabled={!isValid}>
              continuar
            </SubmitButton>
          </FormEl>
        )}
      </Formik>
    </Wrapper>
  );
};

export default observer(Form);
