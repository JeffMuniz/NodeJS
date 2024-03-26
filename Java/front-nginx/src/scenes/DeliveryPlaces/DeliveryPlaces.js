import React from "react";
import { arrayOf, shape, number, string, func, bool } from "prop-types";

import { LabelUpload } from "src/scenes/DeliveryPlacesNew/Form/Form.styles.js";

import { DeliveryPlaceTemplate } from "@assets";
import { ContainerWrapper, Loading, WithPagination } from "@base";
import { If } from "@utils";
import { SvgIcon } from "@common";

import {
  ContainerButtons,
  GridContainer,
  fileInput,
  IconWrapper,
  LabelRedirect,
  LoadingWrapper,
  TemplateText,
} from "./DeliveryPlaces.styles";

import { Grid, EmptyState } from "./Grid";
import Warning from "./ProcessingWarning/ProcessingWarning";

const subtitle = () => (
  <div>
    Gerencie os locais de entrega dos cartões. Você pode atualizar ou cadastrar
    novos locais manualmente ou enviando os dados pela
    <TemplateText
      href={DeliveryPlaceTemplate}
      download="Modelo-de-Unidades-de-Entrega-mac-visa-card.xlsx"
    >
      Planilha Modelo
    </TemplateText>
    .
  </div>
);

const DeliveryPlaces = ({
  deliveryPlacesData,
  callback,
  requestStatus,
  page,
  fileInputRef,
  onOpenFileDialogClick,
  onChange,
  thereIsSheetProcessing,
  hasGroupAccessLevel,
  routeToDeliveryPlacesNewManually,
  routeToDeliveryPlaceEdit,
  handleGoBack,
  loading,
}) => (
  <ContainerWrapper
    showBackIcon
    headerClickHandler={handleGoBack}
    title="Locais de Entrega"
    isBiggerTitle
    subtitle={subtitle()}
  >
    <If test={loading}>
      <LoadingWrapper>
        <Loading loading />
      </LoadingWrapper>
    </If>
    <If test={!loading}>
      <If test={hasGroupAccessLevel}>
        <ContainerButtons>
          <LabelRedirect
            id="delivery_place_register"
            onClick={routeToDeliveryPlacesNewManually}
          >
            <IconWrapper>
              <SvgIcon name="add" />
            </IconWrapper>
            cadastrar
          </LabelRedirect>
          <LabelUpload id="file_button" onClick={onOpenFileDialogClick}>
            <SvgIcon name="upload" />
            enviar planilha
          </LabelUpload>
          <input
            ref={fileInputRef}
            name="file"
            type="file"
            onChange={event => onChange(event)}
            style={fileInput}
          />
        </ContainerButtons>
      </If>
      <If test={thereIsSheetProcessing}>
        <Warning />
      </If>
      <If test={!thereIsSheetProcessing}>
        <GridContainer>
          <WithPagination
            showLoading
            itemsPerPage={10}
            showSimpleInput
            fieldsToFilterBy={[
              { key: "placeId", description: "Busque pelo ID do Local" },
            ]}
            data={{ totalItems: deliveryPlacesData.totalItems }}
            emptyStateComponent={() => (
              <EmptyState
                onOpenFileDialogClick={onOpenFileDialogClick}
                hasGroupAccessLevel={hasGroupAccessLevel}
              />
            )}
            callback={callback}
            currentPage={page}
            status={requestStatus}
            render={props => (
              <Grid
                {...props}
                data={deliveryPlacesData.content}
                routeToDeliveryPlaceEdit={routeToDeliveryPlaceEdit}
              />
            )}
          />
        </GridContainer>
      </If>
    </If>
  </ContainerWrapper>
);

DeliveryPlaces.propTypes = {
  onOpenFileDialogClick: func.isRequired,
  onChange: func.isRequired,
  fileInputRef: shape({}).isRequired,
  handleGoBack: func.isRequired,
  deliveryPlacesData: shape({
    totalItems: number,
    content: arrayOf(
      shape({
        placeId: string,
        address: string,
        firstContactName: string,
        firstContactDoc: string,
        firstContactDocType: string,
        secondContactName: string,
        secondContactDoc: string,
        secondContactDocType: string,
      }),
    ),
  }),
  callback: func.isRequired,
  requestStatus: string.isRequired,
  page: number,
  thereIsSheetProcessing: bool.isRequired,
  hasGroupAccessLevel: bool.isRequired,
  routeToDeliveryPlacesNewManually: func.isRequired,
  routeToDeliveryPlaceEdit: func.isRequired,
  loading: bool,
};

DeliveryPlaces.defaultProps = {
  deliveryPlacesData: [],
  page: 0,
  loading: false,
};

export default DeliveryPlaces;
