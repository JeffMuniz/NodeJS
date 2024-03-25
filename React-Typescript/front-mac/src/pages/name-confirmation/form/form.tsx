
import {FC} from 'react';
import {Formik} from 'formik';
import {observer} from 'mobx-react-lite';
import {useHistory} from 'react-router';
import {ROUTES} from '~/consts';
import {CartDataStore} from '~/stores';
import {nameValidation, validationBase} from '~/utils';
import {NameConfirmationPageStore} from '../name-confirmation.page.store';
import {
 FSpacer, FallbackInfo, FormEl, Link, NameRadioInput, SubmitButton, Wrapper,
} from './form.styles';

type FormValues = NameConfirmationPage.Form.FormValues;

const Form: FC = () => {

  const history = useHistory();

  const handleFormSubmission = async(values: FormValues) => {
    await NameConfirmationPageStore.confirmName(values.name, '10174759703');
    history.push(ROUTES.CPF_CONFIRMATION);
  };

  const {isLoading} = NameConfirmationPageStore.state;
  const {name} = CartDataStore.state.owner;

  return (
    <Wrapper>
      <Formik<FormValues>
        initialValues={{name}}
        onSubmit={handleFormSubmission}
        validateOnMount
        validationSchema={validationBase().shape({
          name: nameValidation(),
        })}
      >
        {({
          handleChange,
          handleSubmit,
          isValid,
          values,
        }) => (
          <FormEl onSubmit={handleSubmit}>
            {[
              'Maquiina Edu',
              'Maquiina Edu',
              'Maria da Silva',
            ].map((n, index) => (
              <NameRadioInput
                checked={values.name === n}
                id={`name-${index}`}
                key={`name-${index}`}
                label={n}
                onChange={handleChange}
                value={n}
              />
            ))}
            <FallbackInfo>
              Se você é sócio mas seu nome não está na lista, <Link>clique aqui.</Link>
            </FallbackInfo>
            <FSpacer />
            <SubmitButton
              disabled={!isValid}
              isLoading={isLoading}
            >
              confirmar
            </SubmitButton>
          </FormEl>
        )}
      </Formik>
    </Wrapper>
  );
};

export default observer(Form);
