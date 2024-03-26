import React from "react";
import { string, func, number, bool } from "prop-types";
import { DirectionIcon } from "@common";
import { directions } from "@enums";
import { toNumberMask } from "@utils";
import { black, disabledDarkGrey } from "src/styles/colors";
import { Wrapper, PageLabel, Action } from "./PaginationLabel.styles";

export const Pagination = ({
  id,
  totalItems,
  firstItemNumber,
  lastItemNumber,
  canGoBack,
  canGoForward,
  goForward,
  goBackward,
}) => {
  if (totalItems === 0) return null;
  return (
    <Wrapper id={id}>
      <PageLabel id={`${id}_label`}>
        {toNumberMask(firstItemNumber)}-{toNumberMask(lastItemNumber)} de{" "}
        {toNumberMask(totalItems)}
      </PageLabel>
      <Action
        id={`${id}_back`}
        isDisabled={!canGoBack}
        onClick={goBackward({
          id,
          totalItems,
          firstItemNumber,
          lastItemNumber,
          canGoBack,
          canGoForward,
          goForward,
          goBackward,
        })}
      >
        <DirectionIcon
          direction={directions.left}
          color={canGoBack ? black : disabledDarkGrey}
        />
      </Action>
      <Action
        id={`${id}_go`}
        isDisabled={!canGoForward}
        onClick={goForward({
          id,
          totalItems,
          firstItemNumber,
          lastItemNumber,
          canGoBack,
          canGoForward,
          goForward,
          goBackward,
        })}
      >
        <DirectionIcon
          direction={directions.right}
          color={canGoForward ? black : disabledDarkGrey}
        />
      </Action>
    </Wrapper>
  );
};

export default Pagination;

Pagination.propTypes = {
  id: string,
  goForward: func,
  goBackward: func,
  canGoBack: bool,
  canGoForward: bool,
  lastItemNumber: number,
  firstItemNumber: number,
  totalItems: number,
};

Pagination.defaultProps = {
  id: "pagination",
  goForward: () => null,
  goBackward: () => null,
  canGoBack: false,
  canGoForward: false,
  lastItemNumber: 0,
  firstItemNumber: 0,
  totalItems: 0,
};
