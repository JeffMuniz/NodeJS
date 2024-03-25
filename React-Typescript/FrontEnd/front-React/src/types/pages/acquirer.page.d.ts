
declare namespace AcquirerPage {

  type Acquirer = 'getnet'
    | 'safrapay'
    | 'cielo'
    | 'stone'
    | 'pag-seguro'
    | 'rede';

  interface RouteMatchParams {
    acquirer: Acquirer;
  }

  namespace OptionConfig {
    interface Props {
      acquirer: Acquirer;
    }

    namespace SlipModal {
      interface Props {
        show: boolean;
        acquirer: Acquirer;
        onCloseClick: ExternalModules.React.MouseEventHandler;
      }
    }
  }

}
