
import { FC } from 'react';
import { Formik } from 'formik';
import { useHistory } from 'react-router-dom';
import { ROUTES } from '~/consts';
import {
 BirthdayRadioInput, FPageSubtitle, FSpacer, Form as FormEl, MotherNameRadioInput, SubmitButton, Wrapper,
} from './form.styles';

const Form: FC = () => {

  const history = useHistory();

  const handleFormSubmission = () => {
    history.push(ROUTES.ESTABLISHMENT_DATA);
  };

  return (
    <Wrapper>
      <Formik
        initialValues={{
          motherName: '',
          birthday: '',
        }}
        onSubmit={handleFormSubmission}
      >
        {({
          handleChange,
          handleSubmit,
        }) => (
          <FormEl onSubmit={handleSubmit}>
            <FPageSubtitle>
              confirme o nome de seu mãe:
            </FPageSubtitle>
            <MotherNameRadioInput
              label='Maria macna'
              id='mother-name-1'
              name='motherName'
              onChange={handleChange}
            />
            <MotherNameRadioInput
              label='Ana Rosa'
              id='mother-name-2'
              name='motherName'
              onChange={handleChange}
            />
            <MotherNameRadioInput
              label='Tereza Cristina'
              id='mother-name-3'
              name='motherName'
              onChange={handleChange}
              isLast
            />

            <FPageSubtitle>
              confirme sua data de nascimento:
            </FPageSubtitle>
            <BirthdayRadioInput
              label='13/09/1981'
              id='birthday-1'
              name='birthday'
              onChange={handleChange}
            />
            <BirthdayRadioInput
              label='24/10/1982'
              id='birthday-2'
              name='birthday'
              onChange={handleChange}
            />
            <BirthdayRadioInput
              label='28/02/1984'
              id='birthday-3'
              name='birthday'
              onChange={handleChange}
              isLast
            />

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
