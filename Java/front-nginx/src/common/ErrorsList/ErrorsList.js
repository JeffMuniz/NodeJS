import React from "react";
import { arrayOf, shape, string, number } from "prop-types";

const ErrorsList = ({ data: errors, currentPage, itemsPerPage }) =>
  errors.map(({ error, line }, index) => {
    const newIndex = (currentPage - 1) * itemsPerPage + (index + 1);
    const indexWithOh = newIndex < 10 ? `0${newIndex}` : newIndex;

    return (
      <p key={newIndex}>
        <b>
          {indexWithOh}. {error} (linha {line})
        </b>
      </p>
    );
  });

ErrorsList.propTypes = {
  data: arrayOf(
    shape({
      error: string,
      line: number,
    }),
  ),
};

ErrorsList.defaultProps = {
  data: [],
};

export default ErrorsList;
