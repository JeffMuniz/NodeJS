import styled from "styled-components";

export const Wrapper = styled.div`
  align-items: center;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const Title = styled.span`
  display: block;
  color: #000;
  font-size: 20px;
  font-weight: 600;
  letter-spacing: 0.5px;
  line-height: 27px;
`;

export const Subtitle = styled.span`
  color: #000000;
  font-size: 16px;
  font-weight: 300;
  letter-spacing: 0.4px;
  line-height: 30px;
`;

export const ProductPhoto = styled.div`
  background-color: ${props => props.backgroundColor};
  background-image: url("${props => props.image}");
  background-repeat: no-repeat;
  background-position: center;
  height: 45px;
  width: 60px;
  padding: 23px 18px;
`;

export const Content = styled.div`
  flex: 3;
  margin-left: 23px;
`;

export const Action = styled.div`
  text-align: center;
  margin-right: 26px;
`;
