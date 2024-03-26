import styled from "styled-components";

import { darkGrey, inputPlaceholder } from "@colors";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  border-bottom: 2px dotted ${darkGrey};
  height: 153px;

  a {
    text-decoration: none;
  }

  div:empty {
    display: none;
  }

  div:empty + hr {
    display: none;
  }

  div:empty + hr + div {
    div,
    div {
      section {
        flex-direction: column;
        text-align: initial;
        display: flex;
        align-items: baseline;
      }
    }
  }
`;

export const Separator = styled.hr`
  border: 1px solid ${inputPlaceholder};
  height: 110px;
  margin-top: 25px;
`;

export const WrapperLeft = styled.div`
  flex: 0.5;
`;

export const WrapperRight = styled.div`
  flex: 0.5;
  margin-bottom: 7px;
`;
