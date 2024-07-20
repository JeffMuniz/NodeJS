
import { FC } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { ROUTES } from '~/consts';
import { ContinueButton, Wrapper } from './acquirers.page.styles';
import OptionConfig from './option-config/option-config';
import Options from './options/options';

const route = `${ROUTES.ACQUIRERS}/:acquirer`;

const AcquirersPage: FC = () => {

  const match = useRouteMatch<AcquirerPage.RouteMatchParams>(route);

  return (
    <Wrapper>
      { !match ? (
        <Options />
      ) : (
        <OptionConfig
          acquirer={match.params.acquirer}
        />
      ) }
      <ContinueButton>
        continuar
      </ContinueButton>
    </Wrapper>
  );
};

export default AcquirersPage;
