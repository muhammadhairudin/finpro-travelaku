import React from 'react'
import PropTypes from 'prop-types'
import { useSearchParams } from 'react-router-dom'

export default function Pagination({ 
  currentPage, 
  totalPages,
  onPageChange 
}) {
  const [searchParams] = useSearchParams()

  const handlePageChange = (page) => {
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' })
    onPageChange(page)
  }

  // Generate page numbers array
  const getPageNumbers = () => {
    const pages = []
    const maxVisiblePages = 5

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Always show first page
      pages.push(1)

      // Calculate start and end of visible pages
      let start = Math.max(2, currentPage - 1)
      let end = Math.min(totalPages - 1, currentPage + 1)

      // Add dots if needed
      if (start > 2) pages.push('...')
      
      // Add visible pages
      for (let i = start; i <= end; i++) {
        pages.push(i)
      }

      // Add dots if needed
      if (end < totalPages - 1) pages.push('...')
      
      // Always show last page
      pages.push(totalPages)
    }

    return pages
  }

  return (
    <div className="flex justify-between items-center mt-8">
      {/* Info */}
      <div className="text-sm text-gray-600">
        Halaman {currentPage} dari {totalPages}
      </div>

      {/* Page Numbers */}
      <div className="flex gap-2">
        {/* Prev Button */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-1 rounded ${
            currentPage === 1
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-white text-gray-700 hover:bg-gray-50 border'
          }`}
        >
          Prev
        </button>

        {/* Page Numbers */}
        {getPageNumbers().map((page, index) => (
          <React.Fragment key={index}>
            {page === '...' ? (
              <span className="px-3 py-1">...</span>
            ) : (
              <button
                onClick={() => handlePageChange(page)}
                className={`px-3 py-1 rounded ${
                  currentPage === page
                    ? 'bg-primary text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border'
                }`}
              >
                {page}
              </button>
            )}
          </React.Fragment>
        ))}

        {/* Next Button */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 rounded ${
            currentPage === totalPages
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-white text-gray-700 hover:bg-gray-50 border'
          }`}
        >
          Next
        </button>
      </div>
    </div>
  )
}

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
} 