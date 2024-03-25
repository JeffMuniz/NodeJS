import {FC} from 'react';
import {Formik} from 'formik';
import {useHistory} from 'react-router';
import {ROUTES} from '~/consts';
import {CartDataStore} from '~/stores';
import {cpfMask} from '~/utils';
import {
 CPFInput, FSpacer, Form as FormEl, NameInput, SubmitButton, Wrapper,
} from './form.styles';

type FormValues = CPFConfirmationPage.Form.FormValues;

const Form: FC = () => {

  const history = useHistory();

  const handleFormSubmission = () => {
    history.push(ROUTES.CONTACT_INFO);
  };

  const {name, cpf} = CartDataStore.state.owner;

  return (
    <Wrapper>
      <Formik<FormValues>
        initialValues={{name, cpf}}
        onSubmit={handleFormSubmission}
      >
        {({
          handleSubmit,
          values,
        }) => (
          <FormEl onSubmit={handleSubmit}>
            <NameInput
              id='name'
              label='nome:'
              value={values.name}
              disabled
            />
            <CPFInput
              id='cpf'
              label='cpf:'
              value={cpfMask(values.cpf)}
              disabled
            />
            <FSpacer />
            <SubmitButton>
              confirmar
            </SubmitButton>
          </FormEl>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Form;
