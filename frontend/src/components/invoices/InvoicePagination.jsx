export function InvoicePagination({ resultsLabel }) {
  return (
    <footer className="inv-footer">
      <p className="inv-footer__meta">{resultsLabel}</p>
      <nav className="inv-pagination" aria-label="Pagination factures">
        <button type="button" className="inv-page-btn" disabled>
          ← Précédent
        </button>
        <button type="button" className="inv-page-num inv-page-num--active">
          1
        </button>
        <button type="button" className="inv-page-num">
          2
        </button>
        <button type="button" className="inv-page-num">
          3
        </button>
        <button type="button" className="inv-page-btn">
          Suivant →
        </button>
      </nav>
    </footer>
  );
}
