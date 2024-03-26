import styled from "styled-components";
import { white, whiteF2, dustyGray, blue, black } from "@colors";

import { Button } from "@common";
import { searchIcon } from "@assets";

export const Box = styled.div`
  position: absolute;
  width: 226px;
  height: 325px;
  padding: 12px 22px;
  margin-top: 15px
  margin-left: -50px;
  background-color: ${white};
  box-shadow: 1px 4px 20px rgba(0, 0, 0, 0.1);
`;

export const Span = styled.span`
  color: ${black};
  font-size: 14px;
`;

export const NotFound = styled.span`
  color: ${dustyGray};
  font-size: 14px;
`;

export const SpanBold = styled.span`
  color: ${black};
  font-weight: 600;
  font-size: 14px;
`;

export const CostCenterList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-right: 10px;
  margin-top: 20px;
  overflow-y: auto;
  height: 160px;
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-track {
    background-color: transparent;
    border-radius: 100px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 100px;
    background: #dadada;
  }
`;

export const CostCenterItem = styled.div`
  color: ${black};
  border-top: 1px solid ${whiteF2};
  padding-top: 12px;
`;

export const InputLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const InputRadio = styled.input`
  &:after {
    width: 12px;
    height: 12px;
    border-radius: 15px;
    top: -2px;
    left: -1px;
    background-color: ${white};
    position: relative;
    content: "";
    display: inline-block;
    visibility: visible;
    border: 2px solid #d1d3d1;
  }
  &:checked:after {
    width: 2px;
    height: 2px;
    border-radius: 15px;
    top: -2px;
    left: -1px;
    position: relative;
    background-color: ${white};
    content: "";
    display: inline-block;
    visibility: visible;
    border: 7px solid #ff053f;
  }
`;

export const SearchBar = styled.input`
  width: 162px;
  height: 35px;
  font-size: 16px;
  padding: 0px 20px 0px 40px;
  margin-top: 15px;
  border-radius: 8px;
  outline: none;
  border: 1px solid #dadada;
  background: url(${searchIcon}) 7px center no-repeat;
  &::placeholder {
    color: #dadada;
    font-size: 14px;
  }
`;

export const ContinueButton = styled(Button)`
  height: 38px;
  margin-top: 20px;
`;

export const BackButton = styled.button`
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
  text-decoration: underline;
  text-transform: lowercase;
`;

export const CostCenterInfo = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px 0;
  margin-bottom: 5px;
  border-bottom: 2px dashed ${whiteF2};
`;

export const DocumentList = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding-right: 10px;
  height: 140px;
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-track {
    background-color: transparent;
    border-radius: 100px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 100px;
    background: #dadada;
  }
`;

export const DocumentItem = styled.div`
  display: flex;
  color: ${props => (props.enabled ? blue : dustyGray)};
  cursor: ${props => (props.enabled ? "pointer" : "not-allowed")};
  border-bottom: 2px solid ${whiteF2};
  padding: 6px 0;
`;

export const QuestionMarkIcon = styled.div`
  display: flex;
  align-items: center;
  margin-left: 5px;
`;
