function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden>
      <path
        fill="currentColor"
        d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"
      />
    </svg>
  );
}

export function InvoiceDetailAddPayment({ balanceLabel }) {
  return (
    <section className="inv-dtl-card">
      <div className="inv-dtl-form-card__head">
        <h3 className="inv-dtl-form-card__title">Ajouter un paiement</h3>
        <span className="inv-dtl-solde">{balanceLabel}</span>
      </div>

      <form className="inv-dtl-form">
        <div className="inv-dtl-field">
          <label htmlFor="inv-pay-amount">Montant (MAD)</label>
          <input
            id="inv-pay-amount"
            type="text"
            placeholder="Ex: 10000"
            autoComplete="off"
          />
        </div>

        <div className="inv-dtl-field">
          <label htmlFor="inv-pay-method">Méthode de paiement</label>
          <select id="inv-pay-method" defaultValue="virement">
            <option value="virement">Virement bancaire</option>
            <option value="cheque">Chèque</option>
            <option value="especes">Espèces</option>
          </select>
        </div>

        <div className="inv-dtl-field inv-dtl-field--date">
          <label htmlFor="inv-pay-date">Date de paiement</label>
          <div className="inv-dtl-input-wrap">
            <input
              id="inv-pay-date"
              type="text"
              defaultValue="28/04/2025"
            />
            <span className="inv-dtl-field__calendar">
              <CalendarIcon />
            </span>
          </div>
        </div>

        <div className="inv-dtl-field">
          <label htmlFor="inv-pay-ref">Référence (optionnel)</label>
          <input
            id="inv-pay-ref"
            type="text"
            placeholder="Numéro de référence"
            autoComplete="off"
          />
        </div>

        <div className="inv-dtl-field">
          <label htmlFor="inv-pay-note">Note</label>
          <textarea
            id="inv-pay-note"
            placeholder="Informations complémentaires…"
          />
        </div>

        <button type="button" className="inv-dtl-submit">
          Enregistrer le paiement
        </button>
      </form>
    </section>
  );
}
