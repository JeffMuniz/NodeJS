import React, { Fragment } from "react";
import { shape, arrayOf, string, func } from "prop-types";

import {
  THRow,
  THCol,
  TBRow,
  TBCol,
  EllipsisedCol,
  ButtonDetails,
} from "./Grid.styles";

const Grid = ({ data, routeToDeliveryPlaceEdit }) => (
  <Fragment>
    <THRow id="delivery_places_header_row">
      <THCol id="delivery_places_header_col_name" xs={2}>
        Nome do Local
      </THCol>
      <THCol id="delivery_places_header_col_addr" xs={4}>
        Endereço
      </THCol>
      <THCol id="delivery_places_header_col_resp_one" xs={2}>
        Responsável 1
      </THCol>
      <THCol id="delivery_places_header_col_resp_two" xs={2}>
        Responsável 2
      </THCol>
      <THCol xs={1} />
    </THRow>
    {data.map(
      (
        { id, deliveryPlaceCode, address, firstContactName, secondContactName },
        index,
      ) => (
        <TBRow key={index} id={`delivery_places_body_row_${index}`}>
          <EllipsisedCol
            id={`delivery_places_body_col_${index}_code`}
            xs={2}
            title={deliveryPlaceCode}
          >
            {deliveryPlaceCode}
          </EllipsisedCol>
          <EllipsisedCol
            id={`delivery_places_body_col_${index}_addr`}
            xs={4}
            title={address}
          >
            {address}
          </EllipsisedCol>
          <EllipsisedCol
            id={`delivery_places_body_col_${index}_resp_one`}
            xs={2}
            title={firstContactName}
          >
            {firstContactName}
          </EllipsisedCol>
          <EllipsisedCol
            id={`delivery_places_body_col_${index}_resp_two`}
            xs={2}
            title={secondContactName}
          >
            {secondContactName}
          </EllipsisedCol>
          <TBCol id={`delivery_places_body_col_${index}_details`} xs={1}>
            <ButtonDetails
              id={`btn_delivery_places_body_col_${index}?_delivery`}
              onClick={() => routeToDeliveryPlaceEdit(id)}
            >
              Detalhes
            </ButtonDetails>
          </TBCol>
        </TBRow>
      ),
    )}
  </Fragment>
);

Grid.propTypes = {
  data: arrayOf(
    shape({
      placeId: string,
      deliveryPlaceCode: string,
      address: string,
      firstContactName: string,
      secondContactName: string,
    }),
  ),
  routeToDeliveryPlaceEdit: func.isRequired,
};

Grid.defaultProps = {
  data: [],
};

export default Grid;
