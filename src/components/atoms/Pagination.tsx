import React, { FC } from "react";
import 'styles/pagination.scss';
import cx from 'classnames';

type PaginationProps = {
  totalPageRecords: number,
  currentPage: number,
  perPage: number,
  maxVisibleButton: number,
  setCurrentPage: (page: any) => void,
  setPerPageSize: (pageSize: any) => void
}

const Pagination: FC<PaginationProps> = ({totalPageRecords, currentPage, perPage, maxVisibleButton, setCurrentPage, setPerPageSize}) => {
  const previousClass = cx('page-previous', {'is-disabled': currentPage === 1})
  const totalPages = Math.ceil(totalPageRecords / perPage)
  const nextClass = cx('page-next', {'is-disabled': currentPage === totalPages})


  const goToPage  = (page: number) => {
    page > totalPages ? setCurrentPage(totalPages) : setCurrentPage(page < 1 ? 1 : page)
  }

  const startPage = () => {
    if (currentPage === 1 || totalPages < maxVisibleButton) {
      return 1
    }
    if (currentPage === totalPages) {
      return totalPages - maxVisibleButton + 1
    }
    return currentPage - 1
  }

  const endPage = () => {
    if (totalPages < maxVisibleButton) {
      return totalPages
    }
    return Math.min(startPage() + maxVisibleButton - 1, perPage)
  }

  const renderControlIndexes = () => {
    let pages = [];
    for (let i = startPage(); i <= endPage(); i++) {
      pages.push(i)
    }

    return pages.map((index) => (
      <button className={index === currentPage ? 'page-item active' : 'page-item'}  key={index} onClick={() => goToPage(index)}>
        {index}
      </button>
    ));
  }

  // const onChangeRecordsPerPage = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   setPerPageSize(e.target.value)
  // }
  
  return (
    // <nav className={`page-${direction}`}>
    <>
      {totalPageRecords > perPage && (
        <nav className='page-right'>
          {/* <section>
            <li>Show Items:
              <select onChange={ (e) => onChangeRecordsPerPage(e)}>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
                <option value="40">40</option>
                <option value="50">50</option>
              </select>
            </li>
          </section> */}
          <section className="pagination">
            <button className={previousClass} disabled={currentPage === 1} onClick={() => goToPage(1) }>{"<<"}</button>
            <button className={previousClass} disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1) }>{"<"}</button>
            {renderControlIndexes()}
            <button className={nextClass} disabled={totalPages === currentPage} onClick={() => setCurrentPage((prev: any) => prev + 1 )}>{">"}</button>
            <button className={nextClass} disabled={totalPages === currentPage} onClick={() => goToPage(totalPages) }>{">>"}</button>
          </section>
        </nav>
      )}
    
    </>
   
  )
}

export default Pagination;
