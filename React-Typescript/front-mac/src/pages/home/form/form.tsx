
import {FC} from 'react';
import {Formik} from 'formik';
import {observer} from 'mobx-react-lite';
import {useHistory} from 'react-router';
import {ROUTES} from '~/consts';
import {CartDataStore} from '~/stores';
import {
 cnpjMask, cnpjValidation, maskMiddleware, validationBase,
} from '~/utils';
import {HomePageStore} from '../home.page.store';
import {Form as FormEl, Wrapper} from './form.styles';
import {
 CNPJInput, ContinueButton, FSpacer,
} from './form.styles';

type FormValues = HomePage.Form.FormValues;

const Form: FC = () => {

  const history = useHistory();

  const handleSubmit = async(values: FormValues) => {
    await HomePageStore.recoverCnpjData(values.cnpj);
    history.push(ROUTES.NAME_CONFIRMATION);
  };

  const {isLoading} = HomePageStore.state;
  const {cnpj} = CartDataStore.state;

  return (
    <Wrapper>
      <Formik<FormValues>
        initialValues={{cnpj}}
        onSubmit={handleSubmit}
        validationSchema={validationBase().shape({
          cnpj: cnpjValidation(),
        })}
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
              <CNPJInput
                autoFocus
                onChange={event => maskMiddleware({
                  event,
                  mask: cnpjMask,
                  handleChange,
                })}
                onBlur={handleBlur}
                errorMessage={touched.cnpj ? errors.cnpj : null}
                value={values.cnpj}
              />
              <FSpacer />
              <ContinueButton
                isLoading={isLoading}
                disabled={!isValid}
              >
                continuar
              </ContinueButton>
            </FormEl>
          )}
      </Formik>
    </Wrapper>
  );
};

export default observer(Form);
