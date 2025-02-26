import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { MdArrowBackIosNew } from 'react-icons/md';
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

import './pagination.scss';

const Pagination = ({ itemsPerPage, data, Component }) => {
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0); // index первого item на currentPage

  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(data.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(data.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, data]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };
  console.log(currentItems);

  return (
    <>
      <Component currentItems={currentItems} />
      <ReactPaginate
        nextLabel={<MdKeyboardArrowRight />}
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel={<MdKeyboardArrowLeft />}
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="previous-button"
        nextClassName="next-button"
        disabledClassName="disabled-button"
        previousLinkClassName="previous-link"
        nextLinkClassName="next-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active-page"
        renderOnZeroPageCount={null}
      />
    </>
  );
};

export default Pagination;
