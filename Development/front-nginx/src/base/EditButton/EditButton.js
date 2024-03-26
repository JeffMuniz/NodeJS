import styled from "styled-components";

import { editIcon } from "@assets";

import ActionButton from "../ActionButton/ActionButton";

export const EditButton = styled(ActionButton)`
  background: url(${editIcon}) no-repeat center;
  visibility: ${props => (props.hidden ? "hidden" : "visible")};
`;

export default EditButton;
