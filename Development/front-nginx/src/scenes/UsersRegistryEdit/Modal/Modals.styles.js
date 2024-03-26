import styled from "styled-components";
import { lighterBlack, red, veryLightBlack } from "@colors";

import CommonButton from "src/common/Button/Button";

export const AlertText = styled.p`
  color: ${red};
  font-size: 12px;
  font-weight: 600;
  padding-top: 5px;
`;

export const AlertTextLogout = styled.p`
  color: ${lighterBlack};
  font-size: 15px;
  font-weight: 600;
  padding-top: 10px;
`;

export const ButtonWrapper = styled.div`
  padding: ${props => (props.id === "modal-inactivation" ? "70px" : "30px")};
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;

export const DropdownLabel = styled.p`
  color: ${veryLightBlack};
  padding-top: 20px;
  font-size: 14px;
  font-weight: bold;
  line-height: 19px;
`;

export const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  height: 100%;
  width: 100%;
`;

export const ModalContainer = styled.div`
  width: 510px;
  height: ${props => (props.id === "modal-inactivation" ? "550px" : "430px")};
  text-align: center;
  padding: 30px 45px;
`;

export const ModalText = styled.p`
  font-size: 18px;
  font-weight: 600;
  line-height: 26px;
`;

export const SelectWrapp = styled.div`
  padding-top: 15px;
  text-align: -webkit-center;
  width: 100%;

  div {
    border-radius: 8px;
    width: 290px svg {
      margin-left: 95px;
    }

    div > div .Select-option {
      height: 40px;
    }
  }
`;

export const StyledButton = styled(CommonButton)`
  width: 236px;
`;
