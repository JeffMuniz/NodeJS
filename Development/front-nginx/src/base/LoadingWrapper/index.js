import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Loading, Placeholder } from "@base";

const LoadingArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  height: 100%;
  width: 100%;
  padding-top: ${props => props.paddingTop};
`;

const LoadingWrapper = ({
  children,
  loading,
  hasError,
  messageError,
  paddingTop,
}) => (
  <Placeholder paddingLess {...{ hasError }} message={messageError}>
    {loading ? (
      <LoadingArea {...{ paddingTop }}>
        <Loading loading />
      </LoadingArea>
    ) : (
      children
    )}
  </Placeholder>
);

LoadingWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  loading: PropTypes.bool.isRequired,
  hasError: PropTypes.bool,
  messageError: PropTypes.string,
  paddingTop: PropTypes.string,
};

LoadingWrapper.defaultProps = {
  hasError: false,
  messageError: "",
  paddingTop: null,
};

export default LoadingWrapper;
