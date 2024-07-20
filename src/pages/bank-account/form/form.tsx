
import { FC } from 'react';
import { Formik } from 'formik';
import {
 AccountInput, AgencyInput, BankInput, ContinueButton, DigitInput, FSpacer, Form as FormEl, InlineWrapper, Wrapper,
} from './form.styles';

const Form: FC = () => {

  const handleFormSubmission = () => {

  };

  return (
    <Wrapper>
      <Formik
        initialValues={ {
          bankCode: '',
          agency: '',
          accountNumber: '',
          digit: '',
        } }
        onSubmit={handleFormSubmission}
      >
        { ({ handleSubmit }) => (
          <FormEl onSubmit={handleSubmit}>
            <BankInput />
            <AgencyInput />
            <InlineWrapper>
              <AccountInput />
              <DigitInput />
            </InlineWrapper>
            <FSpacer />
            <ContinueButton onClick={handleSubmit}>
              continuar
            </ContinueButton>
          </FormEl>
        ) }
      </Formik>
    </Wrapper>
  );
};

export default Form;
