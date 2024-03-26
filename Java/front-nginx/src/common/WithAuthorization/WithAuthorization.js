import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

export const MASTER_PROFILE_ID = 1;
export const FINANCIAL_PROFILE_ID = 2;

const getDisplayName = WrappedComponent =>
  WrappedComponent.displayName || WrappedComponent.name || "Component";

const withAuthorization = (WrappedComponent, rolesId) => {
  const WithAuthorization = ({ userData }) => {
    if (!userData.idsPerfis || !userData.idsPerfis.length) return null; // todo: tirar quando houver perfil no user

    let hasOneRequiredProfile = userData.idsPerfis.some(
      profile => profile.id === MASTER_PROFILE_ID,
    );

    if (!hasOneRequiredProfile) {
      for (let index = 0; index < userData.idsPerfis.length; index += 1) {
        const currentProfile = userData.idsPerfis[index];
        if (rolesId.some(roleId => roleId === currentProfile.id)) {
          hasOneRequiredProfile = true;
          break;
        }
      }
    }
    return hasOneRequiredProfile ? <WrappedComponent /> : null;
  };

  WithAuthorization.propTypes = {
    userData: PropTypes.shape({
      idsPerfis: PropTypes.arrayOf(
        PropTypes.shape({ id: PropTypes.number, descricao: PropTypes.string }),
      ),
    }).isRequired,
  };

  const mapStateToProps = ({ user: { profile: user } }) => ({
    userData: user,
  });

  withAuthorization.displayName = `WithAuthorization(${getDisplayName(
    WrappedComponent,
  )})`;

  return connect(mapStateToProps)(WithAuthorization);
};

export default withAuthorization;
