import Styled from "styled-components";

export const TooltipContainer = Styled.div`
   position: relative;
`;

export const StyledTooltip = Styled.div`
 padding: 5px 9px;
  box-sizing: border-box;
  border-radius: 4px;
  background: #2e2f30;
  position: absolute;
  width: 100%;
  transform: translateY(-110%);
  display: ${({ visible }) => (visible ? "block" : "none")}

  ::after {
    content: ' ';
    position: absolute;
    bottom: -8px;
    left: 15px;
    
    width: 0; 
  height: 0; 
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  
  border-top: 10px solid #2e2f30;
  }
`;

export const Message = Styled.p`
  color: #fff;
  font-size: 12px;
  line-height: 14px;
  padding: 0;
  text-align: center;
`;
