export function InvoiceDetailSummary({ summary }) {
  return (
    <section className="inv-dtl-summary">
      <div className="inv-dtl-summary__head">
        <div>
          <p className="inv-dtl-kicker">{summary.invoiceNumber}</p>
          <h2 className="inv-dtl-heading">{summary.title}</h2>
          <span className="inv-dtl-pill">
            <span className="inv-dtl-pill__dot" aria-hidden />
            {summary.statusLabel}
          </span>
        </div>
        <div className="inv-dtl-total">
          <p className="inv-dtl-total__label">Montant total</p>
          <p className="inv-dtl-total__value">{summary.total}</p>
        </div>
      </div>

      <div className="inv-dtl-progress-block">
        <p className="inv-dtl-label">Progression du paiement</p>
        <div className="inv-dtl-progress-row">
          <div className="inv-dtl-progress-track">
            <div
              className="inv-dtl-progress-fill"
              style={{ width: `${summary.progressPct}%` }}
            />
          </div>
          <span className="inv-dtl-progress-meta">{summary.progressText}</span>
        </div>
      </div>

      <div className="inv-dtl-meta3">
        <div>
          <p className="inv-dtl-label">Date de création</p>
          <p className="inv-dtl-value">{summary.created}</p>
        </div>
        <div>
          <p className="inv-dtl-label">Date d&apos;échéance</p>
          <p className="inv-dtl-value">{summary.due}</p>
        </div>
        <div>
          <p className="inv-dtl-label">Reste à payer</p>
          <p className="inv-dtl-value inv-dtl-value--gold">{summary.remaining}</p>
        </div>
      </div>
    </section>
  );
}
