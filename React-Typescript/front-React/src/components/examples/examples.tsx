import { useState } from 'react';
import {
 BaseInput, PageTitle, PrimaryButton,
} from '~/styled';
import { BaseLabel, PageSubtitle } from '~/styled/typography/typography.styled';
import BackButton from '../back-button/back-button.component';
import Checkbox from '../checkbox/checkbox.component';
import DigitInput from '../digit-input/digit-input.component';
import Input from '../input/input.component';
import LoadingButton from '../loading-button/loading-button.component';
import ProgressBar from '../progress-bar/progress-bar.component';
import Radio from '../radio/radio.component';

const space = <div style={ { height: '20px' } } />;

const Examples = () => {

  const [ state, setState ] = useState({
    isLoadingButtonLoading: false,
    currentStep: 1,
  });

  return (
    <div>
      <PageTitle>
          Page Title
        </PageTitle>
        { space }
        <PageSubtitle>
          Page Subtitle
        </PageSubtitle>
        <BaseLabel>
        Sed ut perspiciatis unde machinas iste natus.
        </BaseLabel>
        { space }
        <BaseInput placeholder='base input' />
        { space }
        <form>
          <Input
            placeholder='Input'
            id='test-input'
            errorMessage='Campo obrigatório'
            label='nome:'
          />
          { space }
          <Radio id='test-1' name='test' label='Inativo' />
          { space }
          <Radio id='test-2' name='test' label='Ativo' />
          { space }
          <Checkbox
            id='test-check'
            label='Checkbox'
            onChange={event => console.log(event.target.value)}
            name='test-check-name'
            value={true}
          />
          { space }
          <Checkbox
            id='test-check2'
            label='Checkbox'
            onChange={event => console.log(event)}
            name='test-check-name2'
            value={false}
          />
        </form>
        { space }
        <PrimaryButton>
          primary button
        </PrimaryButton>
        { space }
        <PrimaryButton disabled>
          primary button disabled
        </PrimaryButton>
        { space }
        <LoadingButton
          isLoading={state.isLoadingButtonLoading}
          onClick={() => {
            setState(prev => ({
              ...prev,
              isLoadingButtonLoading: true,
            }));
            setTimeout(() => {
              setState(prev => ({
                ...prev,
                isLoadingButtonLoading: false,
                currentStep: prev.currentStep + 1,
              }));
            }, 750);
          }}
        >
          loading button
        </LoadingButton>
        { space }
        <BackButton onClick={() => { }} />
        { space }
        <ProgressBar
          currentStep={state.currentStep}
          steps={12}
        />
        { space }
        <DigitInput
          digits={6}
          onChange={({ value }) => console.log(value)}
        />
    </div>
  );
};

export default Examples;
