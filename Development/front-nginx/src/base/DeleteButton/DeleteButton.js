import styled from "styled-components";

import { deleteIcon } from "@assets";
import { ActionButton } from "@base";

export const DeleteButton = styled(ActionButton)`
  background: url(${deleteIcon}) no-repeat center;
  visibility: ${props => (props.hidden ? "hidden" : "visible")};
`;

export default DeleteButton;
