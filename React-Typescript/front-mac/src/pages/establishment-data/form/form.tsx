
import {FC} from 'react';
import {Formik} from 'formik';
import {observer} from 'mobx-react-lite';
import {useHistory} from 'react-router-dom';
import {ROUTES} from '~/consts';
import {CartDataStore} from '~/stores';
import {
 nameValidation, phoneValidation, validationBase, zipCodeValidation,
} from '~/utils';
import {exists} from '~/utils/validation/validation.util';
import {EstablishmentDataPageStore} from '../establishment-data.page.store';
import Address from './address/address';
import {
 FSpacer, Form as FormEl, SubmitButton, Wrapper,
} from './form.styles';
import Identity from './identity/identity';

type FormValues = EstablishmentDataPage.Form.FormValues;

const Form: FC = () => {

  const history = useHistory();

  const handleFormSubmission = async(values: FormValues) => {
    await EstablishmentDataPageStore.submitData(values);
    history.push(ROUTES.PAT_QUESTIONS);
  };

  const {isLoading} = EstablishmentDataPageStore.state;
  const {establishment} = CartDataStore.state;

  return (
    <Wrapper>
      <Formik<FormValues>
        initialValues={{
          additionalInfo: establishment.additionalInfo,
          city: establishment.city,
          companyName: establishment.name,
          establishmentPhone: establishment.phone,
          neighborhood: establishment.neighborhood,
          number: establishment.number,
          state: establishment.state,
          street: establishment.street,
          tradingName: establishment.tradingName,
          zipCode: establishment.zipCode,
        }}
        validationSchema={validationBase().shape({
          companyName: nameValidation(),
          establishmentPhone: phoneValidation(),
          number: exists(),
          tradingName: nameValidation(),
          zipCode: zipCodeValidation(),
        })}
        onSubmit={handleFormSubmission}
      >
        {({handleSubmit, isValid}) => (
          <FormEl onSubmit={handleSubmit}>
            <Identity />
            <Address />
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
