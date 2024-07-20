import {
 FC, useCallback, useEffect, useState,
} from 'react';
import { useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { ROUTES } from '~/consts';
import { AppDataStore } from '~/stores';
import {
 HBackButton, HProgressBar, Wrapper,
} from './header.partial.styles';

const Header: FC = () => {

  const { pathname } = AppDataStore.currentLocation;

  const [ state, setState ] = useState<Header.State>({
    currentStep: 1,
  });

  const stepFromRoute = (route: string) => {
    console.log(`Current route: ${route}`);
    switch (route) {
      case ROUTES.HOME: return 0;
      case ROUTES.NAME_CONFIRMATION: return 1;
      case ROUTES.CPF_CONFIRMATION: return 2;
      case ROUTES.CONTACT_INFO: return 3;
      case ROUTES.CONTACT_PREFERENCE: return 4;
      case ROUTES.CONFIRMATION_CODE: return 5;
      case ROUTES.IDENTITY_CONFIRMATION: return 6;
      case ROUTES.ESTABLISHMENT_DATA: return 7;
      case `${ROUTES.PAT_QUESTIONS}/vr/01`:
      case `${ROUTES.PAT_QUESTIONS}/vr/02`:
      case `${ROUTES.PAT_QUESTIONS}/vr/03`:
      case `${ROUTES.PAT_QUESTIONS}/vr/04`:
      case `${ROUTES.PAT_QUESTIONS}/va/05`:
      case `${ROUTES.PAT_QUESTIONS}/va/06`:
      case ROUTES.PAT_QUESTIONS: return 8;
      default: return 1;
    }
  };

  const handleNavigation = useCallback(() => {
    const currentStep = stepFromRoute(pathname);
    setState(prev => ({ ...prev, currentStep }));
  }, [ pathname ]);

  useEffect(() => {
    handleNavigation();
  }, [ handleNavigation, pathname ]);

  const handleBackButtonClick = () => window.history.back();

  const hide = useMemo(() => {
    return pathname === ROUTES.CONGRATS;
  }, [ pathname ]);

  return (
    <Wrapper hide={hide}>
      <HBackButton onClick={handleBackButtonClick} />
      { state.currentStep > 0 && (
        <HProgressBar
          currentStep={state.currentStep}
          steps={12}
        />
      ) }
    </Wrapper>
  );
};

export default observer(Header);
