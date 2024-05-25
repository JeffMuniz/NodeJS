
import { FC, Fragment } from 'react';
import { Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { useRouteMatch } from 'react-router-dom';
import { ROUTES } from '~/consts';
import CashRegisters from './cash-registers/cash-registers';
import DailyServings from './daily-servings/daily-servings';
import DiningPlaces from './dining-places/dining-places';
import FruitOnMenu from './fruit-on-menu/fruit-on-menu';
import { PATQuestionsPageStore } from './pat-questions.page.store';
import {
 Form, MobileOnly, SubmitButton, TabletOnly, Wrapper,
} from './pat-questions.page.styles';
import ServingArea from './serving-area/serving-area';
import TermsModal from './terms-modal/terms-modal';
import VAAcceptance from './va-acceptance/va-acceptance';
import VRAcceptance from './vr-acceptance/vr-acceptance';

type RouteMatchParams = PATQuestionsPage.RouteMatchParams;
type FormValues = PATQuestionsPage.Form;

const route = `${ROUTES.PAT_QUESTIONS}/:type/:question`;

const PATQuestionsPage: FC = () => {

  const { params: { question, type } } = useRouteMatch<RouteMatchParams>(route);

  const handleFormSubmission = () => {
    PATQuestionsPageStore.setState(state => {
      state.showTermsModal = true;
    });
  };

  // const isValidQuestion = () => {

  // };

  // const handleWindowResize = () => {

  // };

  // const stepToMobileStep = () => {

  // };

  // const stepToDesktopStep = () => {

  // };

  // const getNextMobileStep = () => {
  //   // TODO: Prevent navigation to the ServingArea question
  //   // if vr is accepted.
  // };

  // const getNextDesktopStep = () => {

  // };

  return (
    <Wrapper>
      <Formik<FormValues>
        initialValues={{
          cashRegisters: null,
          dailyServings: null,
          diningPlaces: null,
          fruitOnMenu: null,
          servingArea: null,
          vaAcceptance: null,
          vrAcceptance: null,
        }}
        onSubmit={handleFormSubmission}
      >
        { ({ handleSubmit, values }) => (
          <Form onSubmit={handleSubmit}>
            <MobileOnly>
              { type === 'vr' && (
                <Fragment>
                  { question === '01' && <VRAcceptance /> }
                  { question === '02' && <DiningPlaces /> }
                  { question === '03' && <DailyServings /> }
                  { question === '04' && <ServingArea /> }
                  { question === '05' && <FruitOnMenu /> }
                </Fragment>
              ) }
              { type === 'va' && (
                <Fragment>
                  { question === '01' && <VAAcceptance /> }
                  {/* Prevents showing the ServingArea component twice. */}
                  { (question === '02' && values.vrAcceptance === 'no') && (
                    <ServingArea />
                  ) }
                  { question === '03' && <CashRegisters /> }
                </Fragment>
              ) }
            </MobileOnly>

            <TabletOnly>
              { question === '01' && (
                <Fragment>
                  <VRAcceptance />
                  <VAAcceptance />
                </Fragment>
              ) }
              { type.includes('vr') && (
                <Fragment>
                  { question === '02' && (
                    <Fragment>
                      <DiningPlaces />
                      <DailyServings />
                    </Fragment>
                  ) }
                  { question === '03' && (
                    <Fragment>
                      <FruitOnMenu />
                      <ServingArea />
                    </Fragment>
                  ) }
                  { (type.includes('va') && question === '04') && (
                    <CashRegisters />
                  ) }
                </Fragment>
              ) }
              { type === 'va' && (
                <Fragment>
                  <ServingArea />
                  <CashRegisters />
                </Fragment>
              ) }
            </TabletOnly>
            <TermsModal />
            <SubmitButton onClick={handleSubmit}>
              continuar
            </SubmitButton>
          </Form>
        ) }
      </Formik>
    </Wrapper>
  );
};

export default observer(PATQuestionsPage);
