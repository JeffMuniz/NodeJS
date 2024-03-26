import React, { Fragment } from "react";
import { arrayOf, shape } from "prop-types";

import { Row } from "react-styled-flexboxgrid";

import navigate from "src/routes/navigate";
import { Routes } from "src/routes/consts";
import { SvgIcon } from "@common";

import { SubgroupRow, SubgroupCol } from "./SubgroupsPermissions.styles";

export const handleClickSubgroup = (history, id) => () => {
  navigate(history, {
    route: Routes.USER_DETAILS,
    params: { matrixId: id },
  });
};

export const SubgroupsPermissions = ({ subgroups, history }) => (
  <Fragment>
    {subgroups.length ? (
      subgroups.map(({ id, name }, index) => (
        <SubgroupRow
          key={id}
          id={`matrix_row_${index}`}
          onClick={handleClickSubgroup(history, id)}
        >
          <SubgroupCol md={11}>{name}</SubgroupCol>
          <SubgroupCol md={1} right>
            <SvgIcon name="arrowDown" />
          </SubgroupCol>
        </SubgroupRow>
      ))
    ) : (
      <Row center="xs">
        <span id="access-permissions-matrix-list-not-found">
          Nenhum funcionário encontrado
        </span>
      </Row>
    )}
  </Fragment>
);

SubgroupsPermissions.propTypes = {
  subgroups: arrayOf(shape({})).isRequired,
  history: shape({}).isRequired,
};

export default SubgroupsPermissions;
