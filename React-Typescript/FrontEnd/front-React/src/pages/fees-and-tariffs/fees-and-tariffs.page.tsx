
import { FC, Fragment } from 'react';
import {
 ContinueButton, FATPageSubtitle, FATTable, Pink, Text, TextBold, TextSmall, Wrapper,
} from './fees-and-tariffs.page.styles';

const FeesAndTariffsPage: FC = () => (
  <Wrapper>
    <FATPageSubtitle>
      taxas e tarifas
    </FATPageSubtitle>
    <FATTable
      matrix={ tableData.map(td => td.map(item => (
        <Fragment>
          { item.main && (
            <TextBold>
              {item.main}
              { item.pink && (
                <Pink>{item.pink}</Pink>
              ) }
            </TextBold>
          ) }
          { item.text && (
            <Text>
              {item.text}
            </Text>
          ) }
          { item.smallText && (
            <TextSmall>
              {item.smallText}
            </TextSmall>
          ) }
        </Fragment>
      ))) }
      highlightedColumns={[ 0 ]}
    />
    <ContinueButton>
      continuar
    </ContinueButton>
  </Wrapper>
);

const tableData: FeesAndTariffsPage.TableData = [
  [ {
    main: 'Taxas e Tarifas',
  }, {
    main: 'Aceitação',
    pink: 'machina',
  } ],

  [ {
    text: 'MDR',
  }, {
    main: 'Grátis',
    text: 'A cada transação',
  } ],

  [ {
    text: 'Adesão',
  }, {
    main: 'R$ 100,00',
    smallText: 'No credenciamento',
  } ],

  [ {
    text: 'Liquidação',
  }, {
    main: 'R$ 0,90',
    smallText: 'A cada pagamento de liquidação',
  } ],

  [ {
    text: 'Reprocessamento de Liquidação',
  }, {
    main: 'R$ 0,90',
    smallText: 'A cada reenvio de pagamento rejeitado',
  } ],

  [ {
    text: 'Anuidade',
  }, {
    main: 'R$ 100,00',
    smallText: 'Anualmente durante o contrato vigente',
  } ],
];

export default FeesAndTariffsPage;
