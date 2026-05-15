function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden>
      <path
        fill="currentColor"
        d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
      />
    </svg>
  );
}

export function InvoiceFilters() {
  return (
    <div className="inv-toolbar">
      <div className="inv-search inv-search--icon">
        <span className="inv-search__icon">
          <SearchIcon />
        </span>
        <input type="search" placeholder="Rechercher une facture…" />
      </div>
      <div className="inv-tabs" role="tablist">
        <button type="button" className="inv-tab inv-tab--active">
          Toutes
        </button>
        <button type="button" className="inv-tab">
          Payées
        </button>
        <button type="button" className="inv-tab">
          Partielles
        </button>
        <button type="button" className="inv-tab">
          Impayées
        </button>
      </div>
    </div>
  );
}
