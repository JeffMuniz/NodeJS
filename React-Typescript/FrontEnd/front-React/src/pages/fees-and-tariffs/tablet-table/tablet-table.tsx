
import {
 FC, Fragment, useMemo,
} from 'react';
import {
 Pink, Text, TextBold, TextSmall, Wrapper,
} from './tablet-table.styles';

type TableData = FeesAndTariffsPage.TabletTable.TableData;

const TabletTable: FC = () => {

  const tableData = useMemo<TableData>(() => [
    [{
      main: 'Taxas e Tarifas',
    }, {
      main: 'Aceitação',
      pink: 'mac',
    }, {
      main: 'Quando será cobrado',
    }],

    [{
      text: 'MDR',
    }, {
      text: 'Grátis',
    }, {
      smallText: 'A cada transação',
    }],

    [{
      text: 'Adesão',
    }, {
      text: 'R$ 100,00',
    }, {
      smallText: 'No credenciamento',
    }],

    [{
      text: 'Liquidação',
    }, {
      text: 'R$ 0,90',
    }, {
      smallText: 'A cada pagamento de liquidação',
    }],

    [{
      text: 'Reprocessamento de Liquidação',
    }, {
      text: 'R$ 0,90',
    }, {
      smallText: 'A cada reenvio de pagamento rejeitado',
    }],

    [{
      text: 'Anuidade',
    }, {
      text: 'R$ 100,00',
    }, {
      smallText: 'Anualmente durante o contrato vigente',
    }],
  ], [ ]);

  return (
    <Wrapper
      matrix={tableData.map((td, index) => td.map(item => (
        <Fragment key={index}>
          {item.main && (
            <TextBold>
              {item.main}
              {item.pink && (
                <Pink>{item.pink}</Pink>
              )}
            </TextBold>
          )}
          {item.text && (
            <Text>
              {item.text}
            </Text>
          )}
          {item.smallText && (
            <TextSmall>
              {item.smallText}
            </TextSmall>
          )}
        </Fragment>
      )))}
      highlightedColumns={[ 0 ]}
    />
  );
};

export default TabletTable;
