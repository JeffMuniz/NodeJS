
import {FC} from 'react';
import {observer} from 'mobx-react-lite';
import {useHistory} from 'react-router-dom';
import {ROUTES} from '~/consts';
import Acquirers from './acquirers/acquirers';
import BankAccount from './bank-account/bank-account';
import {DataConfirmationPageStore} from './data-cofnirmation.page.store';
import {
 DCCheckedLabel, DCPageSubtitle, FinishButton, Wrapper,
} from './data-confirmation.page.styles';
import Establishment from './establishment/establishment';
import Personal from './personal/personal';

const DataConfirmationPage: FC = () => {

  const history = useHistory();

  const handleFinishButtonClick = async() => {
    await DataConfirmationPageStore.finishOrder();
    history.push(ROUTES.CONGRATS);
  };

  const {isLoading} = DataConfirmationPageStore.state;

  return (
    <Wrapper>
      <DCPageSubtitle>
        dados do proprietário
      </DCPageSubtitle>
      <DCCheckedLabel label='dados corretos' />
      <Personal />

      <DCPageSubtitle>
        dados do estabelecimento
      </DCPageSubtitle>
      <DCCheckedLabel label='dados corretos' />
      <Establishment />

      <DCPageSubtitle>
        produtos escolhidos
      </DCPageSubtitle>
      <Acquirers />

      <DCPageSubtitle>
        dados bancários:
      </DCPageSubtitle>
      <BankAccount />

      <FinishButton isLoading={isLoading} onClick={handleFinishButtonClick}>
        finalizar cadastro
      </FinishButton>
    </Wrapper>
  );
};

export default observer(DataConfirmationPage);
