import styled from "styled-components";
import CommonButton from "src/common/Button/Button";
import { ifStyle } from "@utils";
import { lighterBlack, borderGrey, white, blue } from "src/styles/colors";

const canceled = ifStyle("canceled");
const right = ifStyle("right");
const showArrow = ifStyle("show_arrow");

export const Canceled = styled.div`
  position: absolute;
  display: ${canceled("block", "none")};
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${white};
  z-index: 2;
  cursor: pointer;
  border-radius: 4px;
  opacity: 0.6;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  margin-left: 20px;
  align-items: center;
  height: 245px;
  max-width: 567px;
  position: relative;
`;

export const StyledNumber = styled.span`
  display: block;
  padding-top: 45px;
  font-weight: 700;
  font-size: 28px;
  letter-spacing: 0.3px;
  font-family: Barlow, sans-serif;
  color: ${lighterBlack};
  font-family: Barlow, sans-serif;
`;

export const StyledLink = styled.span`
  display: block;
  color: ${blue};
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const Button = styled(CommonButton)`
  width: 236px;
`;

export const ButtonsArea = styled.div`
  border-top: 1px solid ${borderGrey};
  padding: 40px 0 0;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;

export const CancelButton = styled(Button)`
  border: none;
`;

export const SubmitButton = styled(Button)``;

export const VoucherImage = styled.div`
  user-select: none;
  margin-left: 9px;
`;

export const VoucherBody = styled.div`
  height: 245px;
  margin-left: 19px;
  width: 330px;
  margin-right: 24px;
`;

export const Arrow = styled.div`
  position: absolute;
  width: 45px;
  height: 45px;
  background-color: rgba(0, 0, 0, 0.5);
  text-align: center;
  border-radius: 50%;
  cursor: pointer;
  font-size: 20px;
  line-height: 45px;
  color: ${white};
  top: 116px;
  z-index: 1;
  user-select: none;
  left: ${right("95%", 0)};
  display: ${showArrow("block", "none")};
`;

export const Item = styled.div`
  width: 567px;
`;

export const VoucherList = styled.div`
  display: flex;
  transition-duration: 2s;
  transform: translate3d(${props => props.position}px, 0px, 0px);
`;
