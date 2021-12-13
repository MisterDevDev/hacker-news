import React from "react";
import { paginationProps } from "../../types/component";

const Pagination: React.FC<paginationProps> = ({
  storiesPerPage,
  totalStories,
  paginate,
}) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalStories / storiesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number) => {
          return (
            <a
              key={number}
              onClick={() => paginate(number)}
              className="page-link"
            >
              <li className="page-item">{number}</li>
            </a>
          );
        })}
      </ul>
    </nav>
  );
};

export default Pagination;
