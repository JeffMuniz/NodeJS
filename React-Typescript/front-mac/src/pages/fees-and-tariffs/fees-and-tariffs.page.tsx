
import {useCallback} from 'react';
import {FC} from 'react';
import {useHistory} from 'react-router-dom';
import {ROUTES} from '~/consts';
import {
 ContinueButton, FATPageSubtitle, FATSpacer, Wrapper,
} from './fees-and-tariffs.page.styles';
import MobileTable from './mobile-table/mobile-table';
import TabletTable from './tablet-table/tablet-table';

const FeesAndTariffsPage: FC = () => {

  const history = useHistory();

  const handleContinueButtonClick = useCallback(() => {
    history.push(ROUTES.BANK_ACCOUNT);
  }, [ history ]);

  return (
    <Wrapper>
      <FATPageSubtitle>
        taxas e tarifas
      </FATPageSubtitle>
      <MobileTable />
      <TabletTable />
      <FATSpacer />
      <ContinueButton onClick={handleContinueButtonClick}>
        continuar
      </ContinueButton>
    </Wrapper>
  );
};

export default FeesAndTariffsPage;
