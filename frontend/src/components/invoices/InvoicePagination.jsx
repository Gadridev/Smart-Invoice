export function InvoicePagination({ resultsLabel, totalPages, currentPage, setCurrentPage }) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <footer className="inv-footer">
      <p className="inv-footer__meta">{resultsLabel}</p>
      <nav className="inv-pagination" aria-label="Pagination factures">
        
        <button
          type="button"
          className="inv-page-btn"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          ← Précédent
        </button>

        
        {pages.map((page) => (
          <button
            type="button"
            key={page}
            className={`inv-page-num ${currentPage === page ? "inv-page-num--active" : ""}`}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </button>
        ))}

        <button
          type="button"
          className="inv-page-btn"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Suivant →
        </button>

      </nav>
    </footer>
  );
}