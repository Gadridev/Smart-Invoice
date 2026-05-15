export function SupplierDetailRecentInvoices({ invoices }) {
  return (
    <section className="sup-dtl-card">
      <div className="sup-dtl-invoices-head">
        <h3 className="sup-dtl-card__title">Dernières factures</h3>
        <button type="button" className="sup-dtl-link">
          Toutes →
        </button>
      </div>
      <ul className="sup-dtl-invoice-list">
        {invoices.map((inv) => (
          <li key={inv.id} className="sup-dtl-invoice">
            <div className="sup-dtl-invoice__left">
              <div className="sup-dtl-invoice__top">
                <span className="sup-dtl-invoice__num">{inv.number}</span>
                <span className={`sup-dtl-badge sup-dtl-badge--${inv.status}`}>
                  {inv.statusLabel}
                </span>
              </div>
              <p className="sup-dtl-invoice__meta">{inv.meta}</p>
            </div>
            <span
              className={`sup-dtl-invoice__amount sup-dtl-invoice__amount--${inv.amountTone}`}
            >
              {inv.amount}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
