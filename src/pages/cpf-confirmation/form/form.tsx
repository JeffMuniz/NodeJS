import { FC } from 'react';
import { Formik } from 'formik';
import { useHistory } from 'react-router';
import { ROUTES } from '~/consts';
import {
 CPFInput, FSpacer, Form as FormEl, NameInput, SubmitButton, Wrapper,
} from './form.styles';

const Form: FC = () => {

  const history = useHistory();

  const handleFormSubmission = () => {
    history.push(ROUTES.CONTACT_INFO);
  };

  return (
    <Wrapper>
      <Formik
        initialValues={{
          name: 'Maquiina Edu',
          cpf: '123123123-123',
        }}
        onSubmit={handleFormSubmission}
      >
        { ({
          handleSubmit,
          handleChange,
          values,
        }) => {

          return (
            <FormEl onSubmit={handleSubmit}>
              <NameInput
                id='name'
                label='nome:'
                value={values.name}
                onChange={handleChange}
              />
              <CPFInput
                id='cpf'
                label='cpf:'
                value={values.cpf}
                onChange={handleChange}
              />
              <FSpacer />
              <SubmitButton>
                confirmar
              </SubmitButton>
            </FormEl>
          );
        } }
      </Formik>
    </Wrapper>
  );
};

export default Form;
