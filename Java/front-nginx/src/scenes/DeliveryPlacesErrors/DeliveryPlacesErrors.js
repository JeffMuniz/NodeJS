import React from "react";
import { LabelUpload } from "src/scenes/DeliveryPlacesNew/Form/Form.styles.js";
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
import { RowCentered, ColCentered } from "./DeliveryPlacesErrors.styles";
import { fileInput } from "../DeliveryPlaces/DeliveryPlaces.styles";

const DeliveryPlacesErrors = ({
  errorsList,
  errorsStatus,
  callback,
  hasErrors,
  headerClickHandler,
  fileInputRef,
  openFileDialog,
  onChange,
}) => (
  <ContainerWrapper
    showBackIcon
    showHeaderBorder
    headerClickHandler={headerClickHandler}
    title="Notificação"
  >
    <div>
      <If test={hasErrors}>
        <CardHeader id="delivery_places_errors_header_wrapper">
          <CardText id="delivery_places_errors_header_content">
            Identificamos inconsistências nos locais de entrega enviados na
            planilha.
          </CardText>
          <LinkButton
            id="btn_back_delivery_places"
            onClick={headerClickHandler}
          >
            <SvgIcon name="arrowUp" />
          </LinkButton>
        </CardHeader>
      </If>
      <div>
        <If test={hasErrors}>
          <RowCentered>
            <ColCentered>
              <p>
                Confira os erros listados e reenvie a planilha com os dados
                corretos.
              </p>
            </ColCentered>

            <ColCentered>
              <LabelUpload id="file_button" onClick={openFileDialog}>
                <SvgIcon name="upload" />
                reenviar planilha
              </LabelUpload>
              <input
                ref={fileInputRef}
                name="file"
                type="file"
                onChange={onChange}
                style={fileInput}
              />
            </ColCentered>
          </RowCentered>
        </If>
        <WithPagination
          data={errorsList}
          callback={callback}
          itemsPerPage={10}
          status={errorsStatus}
          showLoading
          isDashed
          render={props => <ErrorsList data={errorsList.content} {...props} />}
        />
      </div>
    </div>
  </ContainerWrapper>
);

DeliveryPlacesErrors.propTypes = {
  openFileDialog: func.isRequired,
  fileInputRef: shape({}).isRequired,
  onChange: func.isRequired,
  errorsList: shape({
    content: arrayOf(shape({})),
    totalItems: number,
  }),
  errorsStatus: string,
  callback: func.isRequired,
  hasErrors: bool,
  headerClickHandler: func,
};

DeliveryPlacesErrors.defaultProps = {
  errorsList: {
    content: [],
    totalItems: 0,
  },
  errorsStatus: "none",
  headerClickHandler: () => undefined,
  hasErrors: false,
};

export default DeliveryPlacesErrors;
