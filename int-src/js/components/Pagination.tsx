type PaginationProps = {
  page: number
  totalPages: number
  prevPage: () => void
  nextPage: () => void
}

const Pagination = ({
  page,
  totalPages,
  prevPage,
  nextPage,
}: PaginationProps) => {
  return (
    <nav className='pagination' aria-label='page navigation'>
      <p className='pagination__info'>
        Page {page} of {totalPages}
      </p>
      {page > 1 && (
        <button className='pagination__btn' onClick={prevPage}>
          Prev Page
        </button>
      )}
      {page < totalPages && (
        <button className='pagination__btn' onClick={nextPage}>
          Next Page
        </button>
      )}
    </nav>
  )
}

export default Pagination
