
import {FC} from 'react';
import {Formik} from 'formik';
import {useHistory} from 'react-router-dom';
import {ROUTES} from '~/consts';
import {
 dateStrValidation, nameValidation, toDateString, validationBase,
} from '~/utils';
import {IdentityConfirmationPageStore} from '../identity-confirmation.page.store';
import {
 BirthdayRadioInput, FPageSubtitle, FSpacer, Form as FormEl, Info, InputWrapper, MotherNameRadioInput, SubmitButton, Wrapper,
} from './form.styles';

type FormValues = IdentityConfirmationPage.Form.FormValues;

const Form: FC = () => {

  const history = useHistory();

  const handleFormSubmission = (values: FormValues) => {
    IdentityConfirmationPageStore.confirmIdentity(values);
    history.push(ROUTES.ESTABLISHMENT_DATA);
  };

  return (
    <Wrapper>
      <Formik<FormValues>
        initialValues={{
          motherName: '',
          birthday: '',
        }}
        validationSchema={validationBase().shape({
          motherName: nameValidation(),
          birthday: dateStrValidation(),
        })}
        onSubmit={handleFormSubmission}
        validateOnMount
      >
        {({
          handleChange,
          handleSubmit,
          values,
          isValid,
        }) => (
          <FormEl onSubmit={handleSubmit}>
            <FPageSubtitle>
              confirme o nome da sua mãe:
            </FPageSubtitle>
            <Info>
              Confirme o nome da sua mãe
            </Info>
            <InputWrapper>
              {[
                'Maria macna',
                'Ana Rosa',
                'Tereza Cristina',
              ].map((n, index) => (
                <MotherNameRadioInput
                  checked={values.motherName === n}
                  id={`mother-name-${index}`}
                  key={n}
                  label={n}
                  name='motherName'
                  onChange={handleChange}
                  value={n}
                />
              ))}
            </InputWrapper>
            <FPageSubtitle>
              confirme sua data de nascimento:
            </FPageSubtitle>
            <Info>
              Confirme sua data de nascimento
            </Info>
            <InputWrapper>
              {[
                new Date('1992-09-05'),
                new Date('1992-09-03'),
                new Date('1994-09-05'),
              ].map((d, index) => {
                const strDate = toDateString({date: d});
                return (
                  <BirthdayRadioInput
                    checked={values.birthday === strDate}
                    id={`birthday-${index}`}
                    key={strDate}
                    label={strDate}
                    name='birthday'
                    onChange={handleChange}
                    value={strDate}
                  />
                );
              })}
            </InputWrapper>
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
