import React from "react";
import { shape, arrayOf, number, string, func, bool } from "prop-types";
import {
  ContainerWrapper,
  WithPagination,
  CardHeader,
  CardText,
  LinkButton,
} from "@base";
import { If } from "@utils";
import { ErrorsList, SvgIcon } from "@common";

import {
  ErrorMessage,
  ErrorMessageTitle,
  ContainerErrorMessage,
} from "./OrderErrors.styles";

const OrderErrors = ({
  errorsList,
  errorsStatus,
  callback,
  hasErrors,
  headerClickHandler,
  fileId,
  showErrorMessage,
}) => (
  <ContainerWrapper
    showBackIcon
    headerClickHandler={headerClickHandler}
    title="Notificação"
  >
    <div>
      <CardHeader id="order_errors_header_wrapper">
        <CardText id="order_errors_header_content">
          O pedido {fileId} foi processado, porém inconsistências foram
          encontradas
        </CardText>
        <LinkButton id="btn_back_order" onClick={headerClickHandler}>
          <SvgIcon name="arrowUp" />
        </LinkButton>
      </CardHeader>
      <div>
        <ContainerErrorMessage>
          <If test={showErrorMessage || hasErrors}>
            <If test={hasErrors}>
              <ErrorMessageTitle>
                O pedido efetuado apresentou os seguintes problemas e não pode
                ser efetuado:
              </ErrorMessageTitle>
            </If>
            <If test={showErrorMessage}>
              <ErrorMessage>
                Ops, ocorreu um erro na validação do seu pedido!
              </ErrorMessage>
            </If>
          </If>
        </ContainerErrorMessage>
        <WithPagination
          data={errorsList}
          callback={callback}
          itemsPerPage={10}
          status={errorsStatus}
          showLoading
          isDashed
          render={props => <ErrorsList data={errorsList.content} {...props} />}
        />
        <If test={hasErrors}>
          <p>
            Corrija os erros listados acima e submeta sua planilha novamente
            para efetuar o pedido.
          </p>
        </If>
      </div>
    </div>
  </ContainerWrapper>
);

OrderErrors.propTypes = {
  errorsList: shape({
    content: arrayOf(shape({})),
    totalItems: number,
  }),
  errorsStatus: string,
  callback: func.isRequired,
  hasErrors: bool,
  headerClickHandler: func,
  fileId: string,
  showErrorMessage: bool.isRequired,
};

OrderErrors.defaultProps = {
  errorsList: {
    content: [],
    totalItems: 0,
  },
  errorsStatus: "none",
  headerClickHandler: () => undefined,
  fileId: undefined,
  hasErrors: false,
};

export default OrderErrors;
