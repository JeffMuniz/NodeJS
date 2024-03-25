
import {FC} from 'react';
import {Formik} from 'formik';
import {observer} from 'mobx-react-lite';
import {useHistory} from 'react-router';
import {ROUTES} from '~/consts';
import {CartDataStore} from '~/stores';
import {
 emailValidation, maskMiddleware, phoneMask, phoneValidation, validationBase,
} from '~/utils';
import {ContactInfoPageStore} from '../contact-info.page.store';
import {
 EmailInput, FSpacer, Form as FormEl, PhoneInput, SubmitButton, Wrapper,
} from './form.styles';

type FormValues = ContactInfoPage.Form.FormValues;

const Form: FC = () => {

  const history = useHistory();

  const handleFormSubmission = async(values: FormValues) => {
    await ContactInfoPageStore.submitData(values);
    history.push(ROUTES.CONTACT_PREFERENCE);
  };

  const {isLoading} = ContactInfoPageStore.state;
  const {email, phone} = CartDataStore.state.owner;

  return (
    <Wrapper>
      <Formik<FormValues>
        initialValues={{email, phone}}
        validationSchema={validationBase().shape({
          email: emailValidation(),
          phone: phoneValidation(),
        })}
        onSubmit={handleFormSubmission}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isValid,
          touched,
          values,
        }) => (
          <FormEl onSubmit={handleSubmit}>
            <EmailInput
              autoFocus
              errorMessage={touched.email ? errors.email : null}
              id='email'
              label='Email:'
              name='email'
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder='exemplo@gmail.com'
              value={values.email}
            />
            <PhoneInput
              errorMessage={touched.phone ? errors.phone : null}
              id='phone'
              label='Telefone:'
              name='phone'
              onBlur={handleBlur}
              onChange={event => maskMiddleware({
                event,
                mask: phoneMask,
                handleChange,
              })}
              placeholder='00 000000000'
              value={values.phone}
            />
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
