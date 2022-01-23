import React from "react";
import ReactPaginate from "react-paginate";
let pageCount = 0;
function Pagination({ onPageChange }) {
  return (
    <ReactPaginate
      previousLabel={"← Previous"}
      nextLabel={"Next →"}
      pageCount={pageCount}
      onPageChange={onPageChange}
      disabledClassName={"pagination__link--dis"}
      breakClassName={"page-item"}
      breakLinkClassName={"page-link"}
      containerClassName={"pagination"}
      pageClassName={"page-item"}
      pageLinkClassName={"link page-link"}
      previousClassName={"page-item"}
      previousLinkClassName={"link page-link"}
      nextClassName={"page-item"}
      nextLinkClassName={"link page-link"}
      activeClassName={"active"}
      activeLinkClassName={"active-page-link"}
    />
  );
}
export function paginate(data, page, per_page) {
  pageCount = Math.ceil(data.length / per_page);
  const offset = page * per_page;
  return data.slice(offset, offset + per_page);
}
export default Pagination;
